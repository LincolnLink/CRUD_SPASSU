var app = angular.module('alunosApp', ['ngRoute']); 

// Definição das rotas
app.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', {
      templateUrl: 'lista-alunos.html',
      controller: 'ListaAlunosController'
    })
    .when('/cadastro-edicao/:id?', {
      templateUrl: 'alunoCadastro/cadastro-edicao.html',
      controller: 'CadastroEdicaoController'
    })
    .otherwise({
      redirectTo: '/'
    });
});

// Controlador para listar os alunos
app.controller('ListaAlunosController', ['$scope', '$http', function($scope, $http) {
  $scope.alunos = [];
  $scope.erros = []; 
  $scope.quantidade = 0;
  const apiUrl = 'https://localhost:7047/api/alunos';

  // Carregar lista de alunos da API
  $http.get(apiUrl + '/ObterTodos')
    .then(function(response) {
      $scope.alunos = response.data;
      $scope.quantidade = response.data.length;
      console.log("data: ", response.data);
      
    }, function(error) {
      if (error.data && error.data.errors) {
        $scope.erros = error.data.errors;
      }
      console.error('Erro ao carregar alunos:', error);
    });

  // Excluir um aluno
  $scope.excluirAluno = function(id) {
    $http.delete(apiUrl + '/' + id)
      .then(function(response) {
        $scope.alunos = $scope.alunos.filter(function(aluno) {
          return aluno.id !== id;
        });
      }, function(error) {
        if (error.data && error.data.errors) {
          $scope.erros = error.data.errors;
        }
        console.error('Erro ao excluir aluno:', error);
      });
  };
}]);

// Controlador para cadastro e edição
app.controller('CadastroEdicaoController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $scope.aluno = {
    Nome: '',
    Idade: 0
  };
  
  const apiUrl = 'https://localhost:7047/api/alunos';
  const alunoId = $routeParams.id;
  console.log("id valor: ", alunoId);
  if (alunoId) {
    // Se existe um ID, fazemos o GET para pegar o aluno
    $http.get(apiUrl + '/' + alunoId)
      .then(function(response) {
        $scope.aluno = response.data;
      }, function(error) {
        if (error.data && error.data.errors) {
          $scope.erros = error.data.errors;
        }
        console.error('Erro ao carregar aluno:', error);
      });
  }

  // Função para salvar aluno (Cadastrar ou Editar)
  $scope.salvarAluno = function() {
    if ($scope.aluno.id) {
      // Se tiver id, é um "editar"
      $http.put(apiUrl + '/' + $scope.aluno.id, $scope.aluno)
        .then(function(response) {
          alert('Aluno atualizado com sucesso!');
        }, function(error) {
          if (error.data && error.data.errors) {            
            if(error.data.errors.Nome){
              var listerros = error.data.errors.Nome;
              $scope.erros = [...listerros];         
            }            
          }
          console.error('Erro ao atualizar aluno:', error);
        });
    } else {
      // Se não tiver id, é um "novo cadastro"
      $http.post(apiUrl + '/Adicionar', $scope.aluno)
        .then(function(response) {
          alert('Aluno cadastrado com sucesso!');
          
        }, function(error) {
          if (error.data && error.data.errors) {
            if(error.data.errors.Nome){
              var listerros = error.data.errors.Nome;
              $scope.erros = [...listerros];              
            }
            if(error.data.errors.Idade){
              var listerros = error.data.errors.Idade;
              $scope.erros = [...listerros];              
            } 
          }
          console.error('Erro ao cadastrar aluno:', error);
        });
    }
  };
}]);


