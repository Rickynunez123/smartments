<?php
$client = new MongoDB\Client(
    'mongodb+srv://<seanMc>:<dPPQo9jVpTyTQHqL>@smartments.cldqt31.mongodb.net/?retryWrites=true&w=majority');
$db = $client->test;
?>