sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/app/fsappfiorielement/test/integration/FirstJourney',
		'com/app/fsappfiorielement/test/integration/pages/BooksList',
		'com/app/fsappfiorielement/test/integration/pages/BooksObjectPage'
    ],
    function(JourneyRunner, opaJourney, BooksList, BooksObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/app/fsappfiorielement') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBooksList: BooksList,
					onTheBooksObjectPage: BooksObjectPage
                }
            },
            opaJourney.run
        );
    }
);