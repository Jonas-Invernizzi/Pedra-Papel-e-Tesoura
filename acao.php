<?php
session_start();

$palpite = +$_POST['palpite'];
$jogada_antiga = $_SESSION["jogada"]; 

if($palpite == $jogada_antiga){
    $_SESSION["jogada"] = rand(1,3);
    $_SESSION['empates']++;
    die(json_encode([
        'status' => 0,
        "ata" => $_SESSION['empates'],
        'jogada_antiga' => $jogada_antiga 
    ]));
}
else if($palpite == 1 && $jogada_antiga == 2 || $palpite == 2 && $jogada_antiga == 3 || $palpite == 3 && $jogada_antiga == 1){ 
    $_SESSION['vitorias']++;
    $_SESSION["jogada"] = rand(1,3);
    die(json_encode([
        "status" => 1,
        "ata" => $_SESSION['vitorias'],
        'jogada_antiga' => $jogada_antiga, 
    ]));
}
else{
    $_SESSION["jogada"] = rand(1,3); 
    $_SESSION['derrotas']++;
    die(json_encode([
        "status" => -1,
        "ata" => $_SESSION['derrotas'],
        'jogada_antiga' => $jogada_antiga 
    ])); 
}
// 1 = Pedra, 2 = Papel, 3 = Tesoura
?>