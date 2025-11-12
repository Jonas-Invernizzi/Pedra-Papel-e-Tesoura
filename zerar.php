<?php
session_start();
$_SESSION['vitorias'] = 0;
$_SESSION['derrotas'] = 0;
$_SESSION['empates'] = 0;
die(json_encode("[]"));