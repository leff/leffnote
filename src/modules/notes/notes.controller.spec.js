'use strict';

describe('NotesController', function NotesControllerTest() {

  let $rootScope, $scope, $firebaseArray, currentAuth, createController, controller;

  // monkeypatch mock firebase
  window.firebase = {
    database: () => {
      return {
        ref: () => {
          return {
            child: () => {
              return {
                orderByChild: () => {
                  return {
                    limitToLast: () => {}
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  beforeEach( () => {
    module('Notes');

    module( ($provide) => {
      $provide.value('currentAuth', {displayName: 'test'});
      $provide.value('$firebaseArray', () => { return [{title: 'test', content: 'test c'}]; });
    });

  });


  beforeEach(
    inject( (_$rootScope_, $controller, $firebaseArray) => {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $controller = $controller;
      $firebaseArray = $firebaseArray;

      createController = () => {
        return $controller('NotesController', {
          $scope: $scope,
          currentAuth: currentAuth,
          $firebaseArray: $firebaseArray
        });
      };
      controller = createController();
    })
  );

  it('Sets scope', () => {
    $rootScope.$apply();
    expect($scope.notes.length).toEqual(1);
    expect($scope.notes[0].title).toEqual('test');
    expect($scope.notes[0].content).toEqual('test c');
  });

  it('has an add method', () => {
    $rootScope.$apply();
    expect(typeof($scope.addNote)).toEqual('function');
  });

});