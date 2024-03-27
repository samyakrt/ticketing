export const natsWrapper = {
    client:{
        publish:jest.fn().mockImplementation((subject: string,data: Record<string,unknown>, callback: ()=> void) => {
            return callback();
        })
    }
}
