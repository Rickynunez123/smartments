<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login</title>
        <!--Font-->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
        rel="stylesheet"
        />
        <!-- Use styles -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="css/normalize.css" />
        <link rel="stylesheet" href="css/styles.css" />
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" /> <!--javascript animation-->
       
        <script type="text/javascript" language="JavaScript">
        
            function CheckPasswords() {
                var one = document.createAccount.password.value;
                var another = document.createAccount.repass.value;
                if(one == another) { return true; }
                alert("Passwords don't match!");
                return false;
            }
            
        </script>
    </head>
    <body>
        <div class="block" style="min-height: 100vh">
            <div class="container" style="max-width: 640px;">
                <div class="blob">
                    <h2>Create your account</h2>
                    <form name="createAccount" method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
                        <div class="row">
                            <div class="col-sm">
                                <label for="firstName">First Name</label>
                                <input type="text" id="firstName" name="firstName" placeholder="First name" required>
                            </div>

                            <div class="col-sm">
                                <label for="lastName">Last Name</label>
                                <input type="text" id="lastName" name="lastName" placeholder="Last name" required>
                            </div>
                        </div>

                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Username" required>

                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Password" required>

                        <label for="repass">Re-Enter Password</label>
                        <input type="password" id="repass" name="repass" placeholder="Re-enter password" required>

                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" required>

                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890">
                        <p style="margin-bottom: -8px;">Required format: <span style="color: var(--color-primary);">xxx-xxx-xxxx</span></p>

                        <input type="submit" class="btn-login" value="Login" onclick="return CheckPasswords();">
                    </form><br>
                    <div style="margin-top: 24px;"><a href="login.php">Back</a></div>
                </div>
            </div>
        </div>
        <?php
        function alert($message) {
	        echo "<script>alert('$message');</script>";
        }
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // collect value of input field
            $firstName = $_POST['firstName'];
            $lastName = $_POST['lastName'];
            $username = $_POST['username'];
            $password = $_POST['password'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];

            // TODO ======================================================================
            // Filter input for security!
            // ===========================================================================

            $hPassword = hash('sha256', $password . $username);
            
            //initialize database connection
	        $mysqli = new mysqli("localhost","smartments","Smartments#2022","Smartments");

            //verify database connection succeeded 
	        if ($mysqli -> connect_errno) {
		        alert("Could Not Connect To Database!");
	        } else {
                //SQL command string
                $queryString = "SELECT COUNT(*) FROM Users WHERE username='$username' OR email='$email'";
                //execute sql query
		        $result = $mysqli->query($queryString);
        
                //see if login is valid
                if($result->fetch_row()[0] > 0) {
                    alert("An account already exists with these credentials!");
                } else {
                    //insertion string
                    $insertionString = "INSERT INTO Users (username, password, first_name, last_name, email) VALUES ('$username', '$hPassword', '$firstName', '$lastName', '$email')";

                    //insert user into table and redirect if successful
                    if ($mysqli->query($insertionString)) {
                        header("Location: login.php");
                    }

                    //if unsucessful display error
                    if ($mysqli->errno) {
                        alert("Could not create Account!");
                    }
                }
	        }
        }
        ?>
    </body>
</html>
