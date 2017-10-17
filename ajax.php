<?php
header('Content-Type: application/json; charset=UTF-8');

foreach($_POST as $key=>$value) {
  //echo $key.":".$value."\n";
}

$json = array(
  "status" => "",
  "text" => ""
);

if (isset($_POST['guessnumber']) && isset($_POST['answer'])) {
  if ($_POST['guessnumber'] == $_POST['answer']) {
    $json['status'] = "correct";
    $json['text'] = "恭喜猜對!!!! 答案是".$_POST['answer'];
  }
  if ($_POST['guessnumber'] > $_POST['answer']) {
    $json['status'] = "big";
    $json['text'] = "答案似乎有點太大了";
  }
  if ($_POST['guessnumber'] < $_POST['answer']) {
    $json['status'] = "small";
    $json['text'] = "答案似乎有點太小了";
  }
}
else {
  $json['status'] = "error";
  $json['text'] = "資料傳輸有誤";
}

echo json_encode($json);
?>
