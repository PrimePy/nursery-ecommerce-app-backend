import app from './app';

const port: number = app.get('port');

function main(){
	app.listen(port, ()=> {
		console.log('Listen port on ', port);
	});	
}

main();
