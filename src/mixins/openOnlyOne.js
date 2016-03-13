export default {

    getInitialState(){
        return  {
            openedId: null
        }
    },

    isOpen(id){

        return id===this.state.openedId;
    },

    handleOpen(openedId){

        return (ev) => {
            if (ev) ev.preventDefault();
            this.setState({ openedId })
        }
    }
}