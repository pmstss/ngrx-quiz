export class Utils {
    static compareArrays(array1: any[], array2: any[]) {
        if (array1.length !== array2.length) {
            return false;
        }

        return array1.every((item, idx) => item === array2[idx]);
    }
}
