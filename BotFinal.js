var restify = require('restify'); //web server restify
var builder = require('botbuilder');

//Crear servidor
var server = restify.createServer();

//se escucha en distintos puertos, particularmente en el 3978
server.listen(
    process.env.port || 
    process.env.PORT || 
    3978, function(){
        console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

var bot = new builder.UniversalBot(connector);
server.post('api/messages', connector.listen());

// Diálogos
bot.dialog('/',[  // Primer dialogo o dialogo raìz, se crea dentro del bot
    function(session,result,next){
        if(!session.userData.nombre){// preguntar si sabemos el nombre
        builder.Prompts.text(session, '¿Cómo te llamas?');
    }
    else{
        next();//Pasamos al siguiente metodo de la cascada llamada next()
    }
    
    },
    function(session,results){
        if(results.response){
            let msj = results.response;
            session.userData.nombre = msj;
        }
        session.send(`Hola ${session.userData.nombre}!` );
        session.beginDialog('/preguntarLugar');
  

    },
    function (session) {
        
        if (session.dialogData.lugar) {
        
        session.send(`Que bien ${session.userData.lugar}`);
        
        }
        
        else {
        
        session.send('En donde es que estás.');
        
        }
        
        }
        
        ]);
        
        
        
        bot.dialog('/preguntarLugar', [
        
        function (session) {
        
        builder.Prompts.text(session, '¿Dónde estás?');
        
        },
        
        function (session, results) {
        
        session.dialogData.lugar = results.response;
        
        
        
        session.endDialog(`Que bien  ${session.dialogData.lugar} `);
        session.beginDialog('/preguntarComida');
        }
        
        ]);
        bot.dialog('/preguntarComida', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Cuál es tu comida favorita?');
            },
            function (session, results){
                let comida = results.response;
                session.endConversation(`${comida} es una buena comida`);
                session.beginDialog('/preguntarAños');
            }
        ]);
        bot.dialog('/preguntarAños', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Cuántos años tienes?');
            },
            function (session, results){
                let Años = results.response;
                session.endConversation(` ${Años} años que bien `);
                session.beginDialog('/preguntarDeporte');
            }
        ]);
        bot.dialog('/preguntarDeporte', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Cuál es tu deporte favorito?');
            },
            function (session, results){
                let deporte = results.response;
                session.endConversation(` el ${deporte}?, es un buen deporte`);
                session.beginDialog('/preguntarEquipofavorito');
            }
        ]);
        
        bot.dialog('/preguntarEquipofavorito', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Cuál es tu equipo favorito en colombia?');
            },
            function (session, results){
                let equipo = results.response;
                session.endConversation(` ${equipo} , es un buen equipo`);
                session.beginDialog('/preguntardondeestudias');
            }
        
        ]);
        bot.dialog('/preguntardondeestudias', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿en que universidad estas estudiando?');
            },
            function (session, results){
                let universidad = results.response;
                session.endConversation(` en la ${universidad} que bien`);
                session.beginDialog('/preguntarqueestudias');
            }
        
        ]);
        bot.dialog('/preguntarqueestudias', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Que carrera estas estudiando?');
            },
            function (session, results){
                let carrera = results.response;
                session.endConversation(` es una buena carrera ${carrera}`);
                session.beginDialog('/preguntarsemestre');
            }
        
        ]);
        bot.dialog('/preguntarsemestre', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿en que semestre vas?');
            },
            function (session, results){
                let semestre = results.response;
                session.endConversation(` en ${semestre} semestre que bien`);
                session.beginDialog('/preguntarmusicafavorita');
            }
        
        ]);
        bot.dialog('/preguntarmusicafavorita', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿que genero de musica te gusta?');
            },
            function (session, results){
                let musica = results.response;
                session.endDialog(`${musica} es buena,pero hay mejores tipos de musica`);//Ojoooooo
                session.beginDialog('/preguntartegustaviajar');
            }
        
        ]);
        bot.dialog('/preguntartegustaviajar', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿te gusta viajar?');
            },
            function (session, results){
                let viajar = results.response;
             
                if(viajar == 'si' || viajar == 'SI'){
                    session.endConversation(`${viajar} excelente`);
                    session.beginDialog('/adondehasviajado');
                }else{
                    session.endConversation(`${viajar} que lastima `);
                    
                }
            }
        ]);
        bot.dialog('/adondehasviajado', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿a que cuidades de colombia haz viajado?');
            },
            function (session, results){
                let viaje = results.response;
                session.endConversation(`${viaje} excelente a mi tambien me encanta viajar`);
                session.beginDialog('/preguntarEstadocivil');
            }
        
        ]);
        bot.dialog('/preguntarEstadocivil', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Cuál es tu estado civil?');
            },
            function (session, results){
                let estado = results.response;
        
                if(estado == 'casado' || estado == 'CASADO'){
                    session.endDialogWithResult(`${estado} Wow`);
                }else{
                    session.endConversation(` ${estado} que bien por ti`);
                }
                
            }
        ]);