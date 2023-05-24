const NotesController = require('./notes/NotesController');


describe('NotesController method', () => {
     it('should send a status code of 200 when the data exists', () => {
        NotesController.getAll.bind(NotesController)
     })
});
