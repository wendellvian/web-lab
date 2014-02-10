<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>继承</title>
	<script>

	</script>
</head>
<body>
	<?php
		class Person
		{
			function __construct ($name, $sex)
			{
				$this->name = $name;
				$this->sex = $sex;
			}

			function showName ()
			{
				echo $this->name;
			}
			function showSex ()
			{
				echo $this->sex;
			}
		}

		// $p1 = new Person("blue", "男");
		// $p1 -> showName();

		class Worker extends Person
		{
			function __construct ($name, $sex, $job)
			{
				parent::__construct($name, $sex);

				$this -> job = $job;
			}
			function showJob()
			{
				echo $this -> job;
			}
		}

		$w1 = new Worker("blue", "男", "打杂的");
		$w1 -> showJob();
	?>
</body>
</html>