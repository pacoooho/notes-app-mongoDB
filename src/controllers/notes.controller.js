const notesCtrl = {};
const Note = require('../models/Notes')


notesCtrl.renderNoteForm = (req, res) => {
   // console.log(req.user);

    res.render('notes/new-note')
    // res.send("note add");
};
notesCtrl.createNewNote = async (req, res) => {
    const { title, description } = req.body;
    const newNote = new Note({ title, description })
newNote.user =req.user._id ;
   await newNote.save();
    //res.json(newNote);
    req.flash('success_msg','Note Added Successfully');
    res.redirect('/notes')



};

notesCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find({user:req.user.id}).sort({createdAt:'desc'});
    console.log("NOTES");
    res.render('notes/all-notes', { notes });
};
notesCtrl.renderEditForm = async (req, res) => {
    const note = await   Note.findById(req.params.id);
    console.log(note);
    if ( note.user != req.user.id){
        req.flash('error_msg','Not Authorized')
        return res.redirect('/notes');
    }
    res.render('notes/edit-note', { note })
    //  res.send('render edit form');
};
notesCtrl.updateNote = async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description })
    req.flash('success_msg','Note Update Successfully');

    res.redirect('/notes')
    // res.send('update note');
};
notesCtrl.deleteNote = async (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    await Note.findByIdAndDelete(id)
    req.flash('success_msg','Note Delete Successfully');
    res.redirect('/notes');
}
module.exports = notesCtrl;