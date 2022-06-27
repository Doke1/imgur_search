<?php  
    function search(array $search)
    {
        $data = file_get_contents("https://imgur.com/search?q=".$search["data"]);
        $ar = array();
        preg_match_all("<img alt=\"\" src=\x22//i.imgur.com/(.+?).jpg\x22>", $data, $ar);
        $imgs = array();
        for($i = 0; $i < count($ar[1]); $i++) {
            $newStr = substr($ar[1][$i], 0, strlen($ar[1][$i]) - 1);
            $imgs[$i] = "https://i.imgur.com/".$newStr.".jpg";
        }
        return print json_encode($imgs);
    }

    if($_SERVER["REQUEST_METHOD"] === "POST") {
        $body = json_decode(file_get_contents("php://input"), true);

        search($body);
    }
?>