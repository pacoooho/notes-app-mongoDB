





const indexContrl = {};

indexContrl.renderIndex =  (req,res)=>{
    res.render('index')
}
indexContrl.renderAbout =  (req,res)=>{
    res.render('about')
}

module.exports= indexContrl;