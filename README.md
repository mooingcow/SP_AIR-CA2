# SP_AIR-CA2
BED CA2 Assignment

*SET UP & EXECUTING THE CODE*
1. Execute 'db_InitScript.sql' in MySQL Workbench to initialise sp_air database.
2. Open 'SP Air' folder in Visual Studio Code.
3. In a terminal, enter 'cd .\Back-End\'.
4. Launch 'server.js' by typing 'node server.js'.
5. In another terminal, enter 'cd .\Front-End\Scripts'
6. Launch 'index.js' by typing 'node index.js'.
4. In a web browser, navigate to localhost:3001 to access the website.

*FILE MANIFEST*  
-> SP AIR\ 
	->> Front-End
		->>> HTML
			login.html
			index.html
			promotions.html
			searchresults.html
			profile.html
			admin.html
			admin_airports.html
			admin_flights.html
			admin_promotions.html
		
		->>> Images
			airport.png
			cross.png
			down-arrow.png
			dropdownarrow.png
			edit.png
			flight.png
			login-logo.png
			planeicon.png
			plus.png
			profileimage.png
			promotion.png
			searcharrow.png
			sp_air-logo.png
		
		->>> Scripts
			header.js
			index.js
			package-lock.json
		
		->>> Stylesheets
			login.css
			index.css
			promotions.css
			searchresults.css
			profile.css
			admin.css
			admin_airports.css
			admin_flights.css
			admin_promotions.css
			header_footer.css
			reset.css

	->> Back-End
		->>> auth
			isLoggedinMiddleware.js
		
		->>> controller
			app.js
		
		->>> model
			airports.js
			booking.js
			databaseConfig.js
			flights.js
			promotions.js
			transfers.js
			users.js
		
		->>> node_modules
		
		->>> uploads
		
		config.js
		db_InitScript.sql
		package-lock.json
		package.json
		server.js	

	->> node_modules

	Documentation.docx
	package-lock.json
	README.txt
