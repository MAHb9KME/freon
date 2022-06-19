<?
	function format($text){
		$text = trim($text);
		//$text = strip_tags($text);
		$text = stripslashes($text);
		return $text;
	}

	$data = array();
	
	$name = format($_POST['xs_name']);
	$phone = format($_POST['xs_phone']);
	$send_it = format($_POST['send_it']);
	$calc = format($_POST['xs_calc']);
	$xs_theme = format($_POST['xs_theme']);
	$link = format($_POST['xs_link']);
	$email = format($_POST['xs_email']);
	$textinfo = format($_POST['xs_textinfo']);
	$data = $_POST['data'];

	if($send_it == 'y')
	{
		if(!empty($phone))
		{
			
			$message = "<table border='1px' cellspasing='0' cellpadding='5px'>";

			$message .= "<tr><td>Имя</td><td>".$name."</td><tr>";
			$message .= "<tr><td>Телефон</td><td>".$phone."</td><tr>";

			if(!empty($textinfo))
				$message .= "<tr><td>Описание</td><td>".$textinfo."</td><tr>";
			
			$message .= "<tr><td>Тема обращения</td><td>".$xs_theme."</td><tr>";
			$message .= "<tr><td>Страница, с которой отправлено</td><td><a href='".$link."'>".$link."</a></td><tr>";
			
			if(!empty($email))
				$message .= "<tr><td>Email</td><td>".$email."</td><tr>";

			if(count($data) > 0)
			{
				foreach($data as $key => $val)
				{
					$message .= "<tr><td>".format($key)."</td><td>".format($val)."</td><tr>";
				}
			}
			
			$message .= "</table><br/>";

			if(!empty($calc))
				$message .= $calc;
			
			if(empty($xs_theme))


				$xs_theme = 'Заявка с сайта freon-NN.ru';
			
			$headers = "MIME-Version: 1.0\r\n";
			$headers .= "Content-type: text/html; charset=utf-8\r\n";
			$headers .= "From: Сайт LaRent <info@rent-rd.com>\r\n";
			
			$result = mail("rinat.zaripov.2011@mail.ru", $xs_theme, $message, $headers);  
			
			if($result) 
				echo "<p class='good_send'><br/>Ваша заявка успешно сформирована.<br/>В ближайшее время с Вами свяжется наш менеджер для уточнения деталей. Спасибо за Ваше обращение!<br/><br/></p>";
			else 
				echo 'error'; 
		}
		else
			echo 'error';
	}
	
?>