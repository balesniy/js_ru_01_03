export default {
    getInitialState() {
        return {
            isOpen: false
        }
    },

    toggleOpen(ev) {
        if (ev) ev.preventDefault();

        this.setState({
            isOpen: !this.state.isOpen
        })
    },

    close() {
        this.setState({
            isOpen: false
        })
    },

    isOpen(){
        return this.state.isOpen
    }
}