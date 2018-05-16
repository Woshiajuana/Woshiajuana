

class Controller {
    async hello (ctx, next) {
        console.log(2)
        // ctx.pipeDone()
    }
}

export default new Controller();