var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );

app.use( bodyParser.json() );

var mongoose = require( 'mongoose' );

// 27017 is default mongo port
mongoose.connect( 'mongodb://localhost:/27017/test' );

var ourSchema = new  mongoose.Schema({
  name: String,
  location: String
}); // end ourSchema

var ourModel = mongoose.model( 'ourModel', ourSchema );

app.get( '/', function( req, res ){
  res.sendFile( path.resolve( 'public/index.html' ) );
}); // end app.get

app.get( '/getRecords', function( req, res ){
// get and send back all the things
  ourModel.find()
  .then( function( data ){
  res.send( data );
}); // end then
}); // end app.get

app.listen( 8080, 'localhost', function( req, res ){
  console.log( 'listening on 8080' );
}); // app.listen

app.post( '/testPost', function( req, res ){
  console.log( 'req.body.name: ' + req.body.name );
// retrieved the req.body
// putting it into an object to be saved in the db
var recordToAdd = {
  name: req.body.name,
  location: req.body.location
}; // end recordToAdd

// create new record
var newRecord = ourModel( recordToAdd );
  newRecord.save();
}); // end newRecord

app.use( express.static( 'public' ) );
