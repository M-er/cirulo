<?php
namespace App;
/**
*
 Clase Login para ingreso o salida del sistema
*
**/
class Login
{

	public function __construct($logger) {$this->logger = $logger;}
	function getAcc($request, $response, array $args){
		$sess = Session::loggedInfo();
        //$db = DBHandler::getHandler();
		$fh = fopen('./logs/system.log','r');
		while ($line = fgets($fh)) {
			$acciones[] = $line;
		}
		fclose($fh);
		$rta['acciones'] = $acciones;
		$rta['status'] = 'success';
		return $response->withJson($rta);
	}
	function logout($request, $response, array $args){
		Session::destroySession();
		$rta['status'] = 'success';
		$rta['message'] = 'Adios';
		return $response->withJson($rta);

	}
	function login( $request, $response, array $args ){
		$conn = new DBHandler();
		$usuario = $request->getParsedBody();
		$username = $usuario['username'];
		$password = $usuario['password'];
		//$query = "Select iduser, tipouser, nombuser, contuser FROM user WHERE nombuser = '$username'";
		//$user = $conn->getOneRecord($query);
		$user = $usuario; // OJO sacar esto luego que ande todo
		if ($user != NULL) {
			// if(PasswordHash::check_password($user['contuser'],$password)){
			if(true){
				$rta['status'] = "success";
				$rta['message'] = 'Bienvenido: '.$user['username'].' Ha ingresado correctamente';
				$this->logger->addInfo("Ingreso | ".$username);
				$rta['nombuser'] = $user['nombuser'];
				$rta['iduser'] = $user['iduser'];
				$rta['tipouser'] = $user['tipouser'];
				if (!isset($_SESSION)) {
					session_start();
				}
				$_SESSION['iduser'] = $user['iduser'];
				$_SESSION['nombuser'] = $user['nombuser'];
			} else {
				$rta['status'] = "error";
				$rta['message'] = 'Error de inicio de sesion. Credenciales incorrectas';
			}

		}else {
			$rta['status'] = "error";
			$rta['message'] = 'Usuario no registrado.';
		}
		return $response->withJson($rta);
	}
}
?>
