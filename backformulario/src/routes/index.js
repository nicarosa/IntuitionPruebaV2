const express = require('express');
const router = express.Router();

const Form = require('../models/form');
const Questions = require('../models/questions');


const preguntas = new Questions({
    questionOne : "Comida Favorita",
    questionTwo: "Artista Favorito",
    questionThree: "Lugar favorito"
    });
    preguntas.save();

router.get('/',async (req,res) =>{
    const encuestas = await Form.find();
    res.json(encuestas);

});

router.get('/preguntas',async (req,res) =>{
    const preguntas = await Questions.find();
    res.json(preguntas);

});

router.get('/:id', async(req,res)=>{
const encuesta = await Form.findById(req.params.id);
res.json(encuesta);
});

router.post('/', async(req,res) =>{
    const {name,email,phone,
        questionOne,answerOne,
        questionTwo,answerTwo,
        questionThree,answerThree,
        date} = req.body;

        const encuesta = new Form({name,email,phone,
            questionOne,answerOne,
            questionTwo,answerTwo,
            questionThree,answerThree,
            date});
            await encuesta.save();
    res.json({status: 'Encuesta Guardada'});
});

router.put('/:id', async (req,res) => {
 const {name,email,phone,
    questionOne,answerOne,
    questionTwo,answerTwo,
    questionThree,answerThree,
    date} = req.body;
    const newEncuesta = {name,email,phone,
        questionOne,answerOne,
        questionTwo,answerTwo,
        questionThree,answerThree,
        date};

       await Form.findByIdAndUpdate(req.params.id,newEncuesta, {useFindAndModify: false});
       res.json({status:'Encuesta Actualizada'});
});



router.put('/preguntas/:id', async (req,res) => {
    const {
       questionOne,
       questionTwo,
       questionThree,
       } = req.body;
       const newPreguntas = {
           questionOne,
           questionTwo,
           questionThree,
           };
   
          await Questions.findByIdAndUpdate(req.params.id,newPreguntas, {useFindAndModify: false});
          res.json({status:'Preguntas Actualizadas'});
   });


   router.post('/preguntas', async(req,res) =>{
    const {
        questionOne,
        questionTwo,
        questionThree,
        } = req.body;

        const questions = new Questions({
            questionOne,
            questionTwo,
            questionThree,
            });
            await questions.save();
    res.json({status: 'Preguntas Guardadas'});
});

router.delete('/:id', async(req,res)=>{
    await Form.findByIdAndRemove(req.params.id);
    res.json({status: 'Encuesta Eliminada'});
});
module.exports = router;