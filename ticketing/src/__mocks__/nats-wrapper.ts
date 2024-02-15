export const natsWrapper = {
    client:{
        publish(subject: string,data: Record<string,unknown>, callback: ()=> void) {
            callback();
        }
    }
}
