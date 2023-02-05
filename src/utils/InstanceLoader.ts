/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-spread */
/* eslint-disable max-classes-per-file */
export default class InstanceLoader {

    public getInstance<T>(context: { [key: string]: any }, name: string, ...args: any[]): T {
        const classRef: { new (...arg: any[]): any; } = context[name];

        if (!classRef) {
            throw new Error(`The class '${name}' was not found`);
        }

        let Instance = Object.create(classRef.prototype);

        try {
            Instance.constructor.apply(Instance, args);
        } catch (err) {
        /**
         * For ES2015(ES6): constructor.apply is not allowed
         */
            if (/Class constructor/.test(err.toString())) {
                Instance = class extends classRef {

                    constructor(...params: any[]) {
                        super(...params);
                    }

                };

                return <T> new Instance(args);
            }
        }

        return <T>Instance;
    }

}
