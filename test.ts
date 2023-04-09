function Name(arg) {

}

// in java -> 
// ArrayList<int> name = new ArrayList();

// in c++
// vector<string> name = [];

interface Human<T> {
    name: string,
    email: string,
    fav_animal: T
}

interface Dog { 
    breed: string,
    name: string,
}

interface Horse {
    can_dance: boolean
}

interface Cat {
    sharp_claws: boolean
}

const prakash: Human<Cat> = {
    name: 'prakash',
    email: 'abc@gmail.com',
    fav_animal: {
        sharp_claws: true
    }
}

const mansi: Human<Dog> = {
    name: 'mansi',
    email: 'abc@gmail.com',
    fav_animal: {
        breed: 'desi',
        name: 'tommy'
    }
}