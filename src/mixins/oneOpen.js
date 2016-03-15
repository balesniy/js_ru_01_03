export default {
    getInitialState() {
        return {
            openItemId: null
        }
    },
    openItem(openItemId) {
        return (ev) => {
            if (ev) ev.preventDefault()
            this.setState({ openItemId })
        }
    },
    isItemOpen(id) {
        return id === this.state.openItemId
    }
}