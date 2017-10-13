var gulp 		 = require('gulp'),
	sass 		 = require('gulp-sass');
	browserSync  = require('browser-sync'); 	 // Подключаем Browser Sync (Browser Live Reload)
	autoprefixer = require('gulp-autoprefixer'); // Подключаем библиотеку для автоматического добавления префиксов

/* ------- ОСНОВНОЙ ПРИНЦИП РАБОТЫ С GULP -------

gulp.task('taskname', function() 			// - создаем инструкцию с именем taskname
	{
		return gulp.src('source_files')		// - выбор файлов для обработки 
		.pipe(plugin())						// - вызов gulp плагина для обработки
		.pipe(gulp.dest('folder'));			// - возврат результата работы в место назначения
	});
*/


// ------- РОБОТА SASS -------

gulp.task('sass', function(){ 						// Создаем таск "sass"

    return gulp.src('app/sass/main.scss') 			// Берем источник
        .pipe(sass()) 								// Преобразуем Sass в CSS посредством gulp-sass
        
        .pipe(autoprefixer([						// Создаем префиксы
        	'last 15 versions',
        	'> 1%',
        	'ie 8',
        	'ie 7'],
        	{ cascade: true })) 					
        
        .pipe(gulp.dest('app/css/'))					// Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) 	// Обновляем CSS на странице при изменении 		
});


// ------- ПЕРЕЗАГРУЗКА БРУЗЕРА -------
// остановка работы browser Sync осуществляется из терминала по двойному нажатию ctrl + c

gulp.task('browser-sync', function() { 			// Создаем таск browser-sync
    browserSync({ 								// Выполняем browser Sync
        server: { 								// Определяем параметры сервера
            baseDir: 'app' 						// Директория для сервера - app
        },
        notify: false 							// Отключаем уведомления
    });
});


// ------- НАБЛЮДЕНИЕ ЗА ИЗМЕНЕНИЯМИ -------

gulp.task('watch', ['browser-sync', 'sass'], function(){
	gulp.watch('app/sass/**/*.scss', ['sass']); 			// Наблюдение за sass файлами, обновление страницы внутри инструкции SASS
    gulp.watch('app/**/*.html', browserSync.reload);		// Наблюдение за html файлами
});

gulp.task('default', ['watch']);