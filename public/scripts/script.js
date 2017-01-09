var myApp=angular.module( 'myApp', [] );

myApp.controller( 'whereMyPeeps', [ '$scope', '$http', function( $scope, $http ){
// post to db
$scope.addRecord = function(){
  event.preventDefault();

  var objectToSend ={
    name: $scope.nameIn,
    location: $scope.locationIn,
  }; // end var objectToSend
  $http({
    method: 'POST',
    url: '/testPost',
    data: objectToSend
  }); // end http

  // clear fields
  $scope.nameIn ='';
  $scope.locationIn='';
}; // end addRecord

// get info from db
$scope.getRecords = function(){
  $.http({
    method: 'GET',
    url: '/getRecords',
  }).then( function( response ){
    $scope.allTheRecords = response;
    console.log( $scope.allTheRecords );
  }), function myError( response ){
    console.log( response.statusText );
  }; // end function myError
}; // end getRecords


}]); // end myApp controller
