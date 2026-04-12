import express, { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { authenticate } from '../middleware/auth.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// ─── GLB Model Registry ─────────────────────────────────────────────────────
// Maps identified keyword → { subfolder, filename } in public/assets/ar-models/
// subfolder: 'cc-by' | 'cc0'
const GLB_MODELS: Record<string, { sub: string; file: string }> = {

    // ═══════════════════════════════════════════════════════════
    // DOMESTIC ANIMALS
    // ═══════════════════════════════════════════════════════════
    cat: { sub: 'cc-by', file: 'Cat.glb' },
    kitten: { sub: 'cc-by', file: 'Kitten.glb' },
    dog: { sub: 'cc-by', file: 'Dog.glb' },
    puppy: { sub: 'cc-by', file: 'Puppy.glb' },
    beagle: { sub: 'cc-by', file: 'Beagle.glb' },
    poodle: { sub: 'cc-by', file: 'Poodle.glb' },
    husky: { sub: 'cc0', file: 'Husky.glb' },
    pug: { sub: 'cc0', file: 'Pug.glb' },
    shiba: { sub: 'cc0', file: 'Shiba Inu.glb' },
    cow: { sub: 'cc0', file: 'Cow.glb' },
    bull: { sub: 'cc0', file: 'Bull.glb' },
    horse: { sub: 'cc0', file: 'Horse.glb' },
    pig: { sub: 'cc0', file: 'Pig.glb' },
    sheep: { sub: 'cc0', file: 'Sheep.glb' },
    goat: { sub: 'cc-by', file: 'Goat.glb' },
    donkey: { sub: 'cc0', file: 'Donkey.glb' },
    rabbit: { sub: 'cc-by', file: 'Rabbit.glb' },

    // ═══════════════════════════════════════════════════════════
    // WILD MAMMALS
    // ═══════════════════════════════════════════════════════════
    elephant: { sub: 'cc-by', file: 'Elephant.glb' },
    giraffe: { sub: 'cc-by', file: 'Giraffe.glb' },
    hippopotamus: { sub: 'cc-by', file: 'Hippopotamus.glb' },
    rhinoceros: { sub: 'cc-by', file: 'Rhinoceros.glb' },
    panda: { sub: 'cc-by', file: 'Panda.glb' },
    bear: { sub: 'cc-by', file: 'Black bear.glb' },
    tiger: { sub: 'cc-by', file: 'Tiger.glb' },
    jaguar: { sub: 'cc-by', file: 'Jaguar.glb' },
    cheetah: { sub: 'cc-by', file: 'Cheetah.glb' },
    hyena: { sub: 'cc-by', file: 'Spotted hyena.glb' },
    fox: { sub: 'cc0', file: 'Fox.glb' },
    wolf: { sub: 'cc0', file: 'Wolf.glb' },
    deer: { sub: 'cc0', file: 'Deer.glb' },
    zebra: { sub: 'cc0', file: 'Zebra.glb' },
    bison: { sub: 'cc-by', file: 'Bison.glb' },
    gorillatrue: { sub: 'cc-by', file: 'Gorilla.glb' },
    monkey: { sub: 'cc-by', file: 'Spider monkey.glb' },
    ape: { sub: 'cc-by', file: 'Ape.glb' },
    alpaca: { sub: 'cc0', file: 'Alpaca.glb' },
    llama: { sub: 'cc0', file: 'Llama.glb' },
    rat: { sub: 'cc0', file: 'Rat.glb' },
    mouse: { sub: 'cc0', file: 'Mice.glb' },
    bat: { sub: 'cc0', file: 'Bat.glb' },
    badger: { sub: 'cc-by', file: 'Badger.glb' },
    unicorn: { sub: 'cc-by', file: 'Unicorn.glb' },

    // ═══════════════════════════════════════════════════════════
    // BIRDS
    // ═══════════════════════════════════════════════════════════
    bird: { sub: 'cc0', file: 'Bird.glb' },
    sparrow: { sub: 'cc-by', file: 'Sparrow.glb' },
    parrot: { sub: 'cc-by', file: 'Parrot.glb' },
    owl: { sub: 'cc-by', file: 'Great horned owl.glb' },
    hawk: { sub: 'cc-by', file: 'Ferruginous hawk.glb' },
    raven: { sub: 'cc-by', file: 'Raven.glb' },
    seagull: { sub: 'cc-by', file: 'Seagull.glb' },
    flamingo: { sub: 'cc-by', file: 'Flamingo.glb' },
    ostrich: { sub: 'cc-by', file: 'Ostrich.glb' },
    penguin: { sub: 'cc-by', file: 'Penguin.glb' },
    duck: { sub: 'cc-by', file: 'Duck.glb' },
    goose: { sub: 'cc-by', file: 'Goose.glb' },
    chicken: { sub: 'cc-by', file: 'Chicken.glb' },
    hen: { sub: 'cc-by', file: 'Hen.glb' },
    rooster: { sub: 'cc-by', file: 'Rooster.glb' },
    chick: { sub: 'cc-by', file: 'Chick.glb' },

    // ═══════════════════════════════════════════════════════════
    // REPTILES, AMPHIBIANS & DINOSAURS
    // ═══════════════════════════════════════════════════════════
    snake: { sub: 'cc0', file: 'Snake.glb' },
    cobra: { sub: 'cc-by', file: 'Cobra.glb' },
    turtle: { sub: 'cc-by', file: 'Turtle.glb' },
    frog: { sub: 'cc0', file: 'Frog.glb' },
    dinosaur: { sub: 'cc0', file: 'Apatosaurus.glb' },
    stegosaurus: { sub: 'cc0', file: 'Stegosaurus.glb' },
    velociraptor: { sub: 'cc0', file: 'Velociraptor.glb' },
    parasaurolophus: { sub: 'cc0', file: 'Parasaurolophus.glb' },
    dragon: { sub: 'cc-by', file: 'Dragon Rigged.glb' },

    // ═══════════════════════════════════════════════════════════
    // SEA CREATURES
    // ═══════════════════════════════════════════════════════════
    fish: { sub: 'cc0', file: 'Fish.glb' },
    clownfish: { sub: 'cc0', file: 'Clownfish.glb' },
    shark: { sub: 'cc0', file: 'Shark.glb' },
    dolphin: { sub: 'cc0', file: 'Dolphin.glb' },
    whale: { sub: 'cc-by', file: 'Whale.glb' },
    killerwhale: { sub: 'cc-by', file: 'Killer Whale.glb' },
    narwhal: { sub: 'cc-by', file: 'Narwhal.glb' },
    seahorse: { sub: 'cc-by', file: 'Seahorse.glb' },
    sealion: { sub: 'cc-by', file: 'Sea lion.glb' },
    piranha: { sub: 'cc0', file: 'Piranha.glb' },
    pufferfish: { sub: 'cc0', file: 'Pufferfish.glb' },
    jellyfish: { sub: 'cc-by', file: 'Jellyfish.glb' },
    octopus: { sub: 'cc-by', file: 'Octopus.glb' },
    squid: { sub: 'cc-by', file: 'Squid.glb' },
    crab: { sub: 'cc-by', file: 'Crab.glb' },
    crayfish: { sub: 'cc-by', file: 'Crayfish.glb' },
    eel: { sub: 'cc-by', file: 'Eel.glb' },
    manta: { sub: 'cc0', file: 'Manta ray.glb' },
    lionfish: { sub: 'cc0', file: 'Lionfish.glb' },
    anglerfish: { sub: 'cc0', file: 'Anglerfish.glb' },

    // ═══════════════════════════════════════════════════════════
    // INSECTS & BUGS
    // ═══════════════════════════════════════════════════════════
    butterfly: { sub: 'cc-by', file: 'Butterfly.glb' },
    dragonfly: { sub: 'cc-by', file: 'Dragonfly.glb' },
    bee: { sub: 'cc0', file: 'Bee.glb' },
    wasp: { sub: 'cc0', file: 'Wasp.glb' },
    hornet: { sub: 'cc-by', file: 'Hornet.glb' },
    ant: { sub: 'cc-by', file: 'Ant.glb' },
    grasshopper: { sub: 'cc-by', file: 'Grasshopper.glb' },
    ladybug: { sub: 'cc0', file: 'Ladybird.glb' },
    fly: { sub: 'cc0', file: 'Fly.glb' },
    snail: { sub: 'cc-by', file: 'Snail.glb' },
    scorpion: { sub: 'cc-by', file: 'Scorpion.glb' },

    // ═══════════════════════════════════════════════════════════
    // PLANTS & NATURE
    // ═══════════════════════════════════════════════════════════
    tree: { sub: 'cc-by', file: 'Tree.glb' },
    bamboo: { sub: 'cc-by', file: 'Bamboo.glb' },
    flower: { sub: 'cc-by', file: 'Flower.glb' },
    avocado: { sub: 'cc-by', file: 'Avocado.glb' },
    peapod: { sub: 'cc-by', file: 'Peapod.glb' },
    volcano: { sub: 'cc-by', file: 'Volcano.glb' },
    island: { sub: 'cc-by', file: 'Island.glb' },
    sandcastle: { sub: 'cc-by', file: 'Sand castle.glb' },
    snowman: { sub: 'cc-by', file: 'Snowman.glb' },

    // ═══════════════════════════════════════════════════════════
    // SPACE & SCIENCE
    // ═══════════════════════════════════════════════════════════
    earth: { sub: 'cc-by', file: 'Earth.glb' },
    moon: { sub: 'cc-by', file: 'Moon.glb' },
    satellite: { sub: 'cc-by', file: 'Satellite.glb' },
    flyingsaucer: { sub: 'cc-by', file: 'Flying saucer.glb' },
    star: { sub: 'cc-by', file: 'Star.glb' },
    windturbine: { sub: 'cc-by', file: 'Wind turbine.glb' },
    robot: { sub: 'cc-by', file: 'Robot.glb' },

    // ═══════════════════════════════════════════════════════════
    // VEHICLES & TRANSPORT
    // ═══════════════════════════════════════════════════════════
    car: { sub: 'cc-by', file: 'Car.glb' },
    bus: { sub: 'cc-by', file: 'Bus.glb' },
    van: { sub: 'cc-by', file: 'Van.glb' },
    motorcycle: { sub: 'cc-by', file: 'Motorcycle.glb' },
    bicycle: { sub: 'cc-by', file: 'Bicycle.glb' },
    train: { sub: 'cc-by', file: 'Train.glb' },
    boat: { sub: 'cc-by', file: 'Sail Boat.glb' },
    policecar: { sub: 'cc-by', file: 'Police car.glb' },
    gokart: { sub: 'cc-by', file: 'Go kart.glb' },
    unicycle: { sub: 'cc-by', file: 'Unicycle.glb' },
    paperairplane: { sub: 'cc-by', file: 'Paper airplane.glb' },

    // ═══════════════════════════════════════════════════════════
    // OBJECTS & EVERYDAY ITEMS
    // ═══════════════════════════════════════════════════════════
    icecream: { sub: 'cc-by', file: 'Ice cream.glb' },
    popsicle: { sub: 'cc-by', file: 'Popsicle.glb' },
    umbrella: { sub: 'cc-by', file: 'Umbrella.glb' },
    camera: { sub: 'cc-by', file: 'Camera.glb' },
    computer: { sub: 'cc-by', file: 'Computer.glb' },
    laptop: { sub: 'cc-by', file: 'Laptop.glb' },
    clock: { sub: 'cc-by', file: 'Analog clock.glb' },
    teapot: { sub: 'cc-by', file: 'Teapot.glb' },
    shoes: { sub: 'cc-by', file: 'Shoes.glb' },
    broom: { sub: 'cc-by', file: 'Broom.glb' },
    magnifyingglass: { sub: 'cc-by', file: 'Magnifying glass.glb' },
    blackboard: { sub: 'cc-by', file: 'Blackboard.glb' },
    wizardhat: { sub: 'cc-by', file: 'Wizard hat.glb' },
    graduationcap: { sub: 'cc-by', file: 'Graduation cap.glb' },
    videogame: { sub: 'cc-by', file: 'Videogame.glb' },
    recordplayer: { sub: 'cc-by', file: 'Record player.glb' },
    stopsign: { sub: 'cc-by', file: 'Stop sign.glb' },
    trafficlight: { sub: 'cc-by', file: 'Traffic light.glb' },

    // ═══════════════════════════════════════════════════════════
    // PLACES & STRUCTURES
    // ═══════════════════════════════════════════════════════════
    cabin: { sub: 'cc-by', file: 'Cabin.glb' },
    bedroom: { sub: 'cc-by', file: 'Bedroom.glb' },
    pagoda: { sub: 'cc-by', file: 'Pagoda.glb' },
    house: { sub: 'cc-by', file: 'House.glb' },
    castle: { sub: 'cc-by', file: 'Castle.glb' },

    // ═══════════════════════════════════════════════════════════
    // FOOD & DRINKS
    // ═══════════════════════════════════════════════════════════
    pizza: { sub: 'cc-by', file: 'Pepperoni pizza.glb' },
    watermelon: { sub: 'cc-by', file: 'Watermelon.glb' },
    banana: { sub: 'cc-by', file: 'Banana.glb' },
    lollipop: { sub: 'cc-by', file: 'Lollipop.glb' },

    // ═══════════════════════════════════════════════════════════
    // WEATHER
    // ═══════════════════════════════════════════════════════════
    rainbow: { sub: 'cc-by', file: 'Rainbow.glb' },
    lightning: { sub: 'cc-by', file: 'Lightning bolt.glb' },
    cloud: { sub: 'cc-by', file: 'Cloud.glb' },

    // ═══════════════════════════════════════════════════════════
    // SCHOOL & ART TOOLS
    // ═══════════════════════════════════════════════════════════
    pencil: { sub: 'cc-by', file: 'Pencil.glb' },
    pen: { sub: 'cc-by', file: 'Pen.glb' },
    backpack: { sub: 'cc-by', file: 'Backpack.glb' },
    schooldesk: { sub: 'cc-by', file: 'school desk.glb' },
    paintkit: { sub: 'cc-by', file: 'paint kit mini.glb' },
    books: { sub: 'cc-by', file: 'Books.glb' },
    stethoscope: { sub: 'cc-by', file: 'Stethoscope.glb' },

    // ═══════════════════════════════════════════════════════════
    // VEHICLES (new additions)
    // ═══════════════════════════════════════════════════════════
    airplane: { sub: 'cc-by', file: 'Airplane.glb' },
    helicopter: { sub: 'cc-by', file: 'Helicopter.glb' },
    ambulance: { sub: 'cc-by', file: 'Ambulance.glb' },

    // ═══════════════════════════════════════════════════════════
    // SPACE (new additions)
    // ═══════════════════════════════════════════════════════════
    rocketship: { sub: 'cc-by', file: 'Rocketship.glb' },
    spaceshuttle: { sub: 'cc-by', file: 'Space Shuttle.glb' },
    astronaut: { sub: 'cc-by', file: 'Astronaut.glb' },

    // ═══════════════════════════════════════════════════════════
    // CHARACTERS & PEOPLE
    // ═══════════════════════════════════════════════════════════
    doctor: { sub: 'cc-by', file: 'Doctor.glb' },
    teacher: { sub: 'cc-by', file: 'Teacher.glb' },
    pirate: { sub: 'cc-by', file: 'Pirate.glb' },

    // ═══════════════════════════════════════════════════════════
    // OBJECTS & TECH (new additions)
    // ═══════════════════════════════════════════════════════════
    headphones: { sub: 'cc-by', file: 'Headphones.glb' },
    phone: { sub: 'cc-by', file: 'Phone.glb' },
    tv: { sub: 'cc-by', file: 'Flat-screen TV.glb' },
    piano: { sub: 'cc-by', file: 'Piano.glb' },
    table: { sub: 'cc-by', file: 'Table.glb' },
    ferriswheel: { sub: 'cc-by', file: 'Ferris wheel.glb' },
};


// ─── AVAILABLE SUBJECTS grouped by category (for the UI grid) ───────────────
// These are shown as clickable chips. Each group has a label + subjects.
export interface SubjectGroup {
    group: string;
    emoji: string;
    subjects: Array<{ id: string; nameVi: string; emoji: string }>;
}

export const SUBJECT_GROUPS: SubjectGroup[] = [
    {
        group: 'Thú cưng & Gia súc',
        emoji: '🐾',
        subjects: [
            { id: 'cat', nameVi: 'Mèo', emoji: '🐱' },
            { id: 'kitten', nameVi: 'Mèo con', emoji: '🐈' },
            { id: 'dog', nameVi: 'Chó', emoji: '🐶' },
            { id: 'puppy', nameVi: 'Chó con', emoji: '🐕' },
            { id: 'beagle', nameVi: 'Beagle', emoji: '🦴' },
            { id: 'poodle', nameVi: 'Poodle', emoji: '🎀' },
            { id: 'husky', nameVi: 'Husky', emoji: '🐺' },
            { id: 'rabbit', nameVi: 'Thỏ', emoji: '🐰' },
            { id: 'cow', nameVi: 'Bò', emoji: '🐮' },
            { id: 'horse', nameVi: 'Ngựa', emoji: '🐴' },
            { id: 'pig', nameVi: 'Lợn', emoji: '🐷' },
            { id: 'sheep', nameVi: 'Cừu', emoji: '🐑' },
            { id: 'goat', nameVi: 'Dê', emoji: '🐐' },
            { id: 'donkey', nameVi: 'Lừa', emoji: '🫏' },
            { id: 'chicken', nameVi: 'Gà', emoji: '🐓' },
            { id: 'chick', nameVi: 'Gà con', emoji: '🐤' },
            { id: 'duck', nameVi: 'Vịt', emoji: '🦆' },
        ],
    },
    {
        group: 'Động vật hoang dã',
        emoji: '🦁',
        subjects: [
            { id: 'elephant', nameVi: 'Voi', emoji: '🐘' },
            { id: 'giraffe', nameVi: 'Hươu cao cổ', emoji: '🦒' },
            { id: 'hippopotamus', nameVi: 'Hà mã', emoji: '🦛' },
            { id: 'rhinoceros', nameVi: 'Tê giác', emoji: '🦏' },
            { id: 'bear', nameVi: 'Gấu đen', emoji: '🐻' },
            { id: 'panda', nameVi: 'Gấu trúc', emoji: '🐼' },
            { id: 'tiger', nameVi: 'Hổ', emoji: '🐯' },
            { id: 'jaguar', nameVi: 'Báo đốm', emoji: '🐆' },
            { id: 'cheetah', nameVi: 'Báo săn', emoji: '🐆' },
            { id: 'fox', nameVi: 'Cáo', emoji: '🦊' },
            { id: 'wolf', nameVi: 'Sói', emoji: '🐺' },
            { id: 'deer', nameVi: 'Nai', emoji: '🦌' },
            { id: 'zebra', nameVi: 'Ngựa vằn', emoji: '🦓' },
            { id: 'bison', nameVi: 'Bò rừng', emoji: '🦬' },
            { id: 'monkey', nameVi: 'Khỉ', emoji: '🐒' },
            { id: 'gorilla', nameVi: 'Khỉ đột', emoji: '🦍' },
            { id: 'alpaca', nameVi: 'Lạc đà con', emoji: '🦙' },
            { id: 'unicorn', nameVi: 'Kỳ lân', emoji: '🦄' },
        ],
    },
    {
        group: 'Chim',
        emoji: '🐦',
        subjects: [
            { id: 'bird', nameVi: 'Chim', emoji: '🐦' },
            { id: 'sparrow', nameVi: 'Chim sẻ', emoji: '🐦' },
            { id: 'parrot', nameVi: 'Vẹt', emoji: '🦜' },
            { id: 'owl', nameVi: 'Cú mèo', emoji: '🦉' },
            { id: 'hawk', nameVi: 'Diều hâu', emoji: '🦅' },
            { id: 'raven', nameVi: 'Quạ', emoji: '🐦‍⬛' },
            { id: 'seagull', nameVi: 'Mòng biển', emoji: '🐦' },
            { id: 'flamingo', nameVi: 'Hồng hạc', emoji: '🦩' },
            { id: 'ostrich', nameVi: 'Đà điểu', emoji: '🦚' },
            { id: 'penguin', nameVi: 'Chim cánh cụt', emoji: '🐧' },
            { id: 'goose', nameVi: 'Ngỗng', emoji: '🪿' },
            { id: 'hen', nameVi: 'Gà mái', emoji: '🐔' },
            { id: 'rooster', nameVi: 'Gà trống', emoji: '🐓' },
        ],
    },
    {
        group: 'Bò sát, Ếch & Khủng long',
        emoji: '🦕',
        subjects: [
            { id: 'frog', nameVi: 'Ếch', emoji: '🐸' },
            { id: 'turtle', nameVi: 'Rùa', emoji: '🐢' },
            { id: 'snake', nameVi: 'Rắn', emoji: '🐍' },
            { id: 'cobra', nameVi: 'Rắn hổ mang', emoji: '🐍' },
            { id: 'dragon', nameVi: 'Rồng', emoji: '🐉' },
            { id: 'dinosaur', nameVi: 'Khủng long', emoji: '🦕' },
            { id: 'stegosaurus', nameVi: 'Stegosaurus', emoji: '🦕' },
            { id: 'velociraptor', nameVi: 'Velociraptor', emoji: '🦖' },
            { id: 'parasaurolophus', nameVi: 'Parasaurolophus', emoji: '🦕' },
        ],
    },
    {
        group: 'Sinh vật biển',
        emoji: '🌊',
        subjects: [
            { id: 'fish', nameVi: 'Cá', emoji: '🐟' },
            { id: 'clownfish', nameVi: 'Cá hề', emoji: '🐠' },
            { id: 'shark', nameVi: 'Cá mập', emoji: '🦈' },
            { id: 'dolphin', nameVi: 'Cá heo', emoji: '🐬' },
            { id: 'whale', nameVi: 'Cá voi', emoji: '🐳' },
            { id: 'killerwhale', nameVi: 'Cá voi sát thủ', emoji: '🐋' },
            { id: 'narwhal', nameVi: 'Cá kỳ lân', emoji: '🐳' },
            { id: 'seahorse', nameVi: 'Cá ngựa', emoji: '🐠' },
            { id: 'sealion', nameVi: 'Sư tử biển', emoji: '🦭' },
            { id: 'jellyfish', nameVi: 'Sứa', emoji: '🪼' },
            { id: 'octopus', nameVi: 'Bạch tuộc', emoji: '🐙' },
            { id: 'squid', nameVi: 'Mực ống', emoji: '🦑' },
            { id: 'crab', nameVi: 'Cua', emoji: '🦀' },
            { id: 'crayfish', nameVi: 'Tôm hùm', emoji: '🦞' },
            { id: 'eel', nameVi: 'Lươn', emoji: '🐍' },
            { id: 'manta', nameVi: 'Cá đuối', emoji: '🐟' },
        ],
    },
    {
        group: 'Côn trùng & Nhện',
        emoji: '🐛',
        subjects: [
            { id: 'butterfly', nameVi: 'Bướm', emoji: '🦋' },
            { id: 'dragonfly', nameVi: 'Chuồn chuồn', emoji: '🪲' },
            { id: 'bee', nameVi: 'Ong', emoji: '🐝' },
            { id: 'ant', nameVi: 'Kiến', emoji: '🐜' },
            { id: 'grasshopper', nameVi: 'Châu chấu', emoji: '🦗' },
            { id: 'ladybug', nameVi: 'Bọ rùa', emoji: '🐞' },
            { id: 'snail', nameVi: 'Ốc sên', emoji: '🐌' },
            { id: 'scorpion', nameVi: 'Bọ cạp', emoji: '🦂' },
        ],
    },
    {
        group: 'Cây cối & Thiên nhiên',
        emoji: '🌿',
        subjects: [
            { id: 'tree', nameVi: 'Cây', emoji: '🌳' },
            { id: 'bamboo', nameVi: 'Tre', emoji: '🎋' },
            { id: 'flower', nameVi: 'Hoa', emoji: '🌸' },
            { id: 'avocado', nameVi: 'Bơ', emoji: '🥑' },
            { id: 'volcano', nameVi: 'Núi lửa', emoji: '🌋' },
            { id: 'island', nameVi: 'Đảo', emoji: '🏝️' },
            { id: 'sandcastle', nameVi: 'Lâu đài cát', emoji: '🏖️' },
            { id: 'snowman', nameVi: 'Người tuyết', emoji: '☃️' },
        ],
    },
    {
        group: 'Vũ trụ & Khoa học',
        emoji: '🚀',
        subjects: [
            { id: 'earth', nameVi: 'Trái Đất', emoji: '🌍' },
            { id: 'moon', nameVi: 'Mặt Trăng', emoji: '🌕' },
            { id: 'star', nameVi: 'Ngôi sao', emoji: '⭐' },
            { id: 'satellite', nameVi: 'Vệ tinh', emoji: '🛸' },
            { id: 'flyingsaucer', nameVi: 'Đĩa bay', emoji: '🛸' },
            { id: 'robot', nameVi: 'Robot', emoji: '🤖' },
        ],
    },
    {
        group: 'Phương tiện',
        emoji: '🚗',
        subjects: [
            { id: 'car', nameVi: 'Xe hơi', emoji: '🚗' },
            { id: 'bus', nameVi: 'Xe buýt', emoji: '🚌' },
            { id: 'train', nameVi: 'Tàu hỏa', emoji: '🚂' },
            { id: 'motorcycle', nameVi: 'Xe máy', emoji: '🏍️' },
            { id: 'bicycle', nameVi: 'Xe đạp', emoji: '🚲' },
            { id: 'boat', nameVi: 'Thuyền buồm', emoji: '⛵' },
            { id: 'policecar', nameVi: 'Xe cảnh sát', emoji: '🚓' },
            { id: 'paperairplane', nameVi: 'Máy bay giấy', emoji: '✈️' },
        ],
    },
    {
        group: 'Đồ vật & Vật phẩm',
        emoji: '🎒',
        subjects: [
            { id: 'icecream', nameVi: 'Kem ốc quế', emoji: '🍦' },
            { id: 'popsicle', nameVi: 'Kem que', emoji: '🍡' },
            { id: 'umbrella', nameVi: 'Ô dù', emoji: '☂️' },
            { id: 'camera', nameVi: 'Máy ảnh', emoji: '📷' },
            { id: 'laptop', nameVi: 'Máy tính xách tay', emoji: '💻' },
            { id: 'teapot', nameVi: 'Ấm trà', emoji: '🫖' },
            { id: 'clock', nameVi: 'Đồng hồ', emoji: '🕐' },
            { id: 'magnifyingglass', nameVi: 'Kính lúp', emoji: '🔍' },
            { id: 'broom', nameVi: 'Cái chổi', emoji: '🧹' },
            { id: 'videogame', nameVi: 'Gamepad', emoji: '🎮' },
            { id: 'wizardhat', nameVi: 'Mũ phù thủy', emoji: '🧙' },
            { id: 'snowman', nameVi: 'Người tuyết', emoji: '☃️' },
        ],
    },
];

// Flat list of all subjects (used for random suggestions)
export const AVAILABLE_SUBJECTS = SUBJECT_GROUPS.flatMap(g => g.subjects);


// ─── Synonym map: normalize Gemini outputs → GLB_MODELS key ─────────────────
const SYNONYM_MAP: Record<string, string> = {
    // Cats
    kitty: 'cat', feline: 'cat',
    // Dogs
    canine: 'dog', doggy: 'dog', hound: 'dog',
    shiba: 'shiba', 'shiba inu': 'shiba',
    // Rabbit
    bunny: 'rabbit', hare: 'rabbit',
    // Livestock
    ox: 'bull', buffalo: 'bison', 'bighorn sheep': 'sheep',
    pony: 'horse', stallion: 'horse', mare: 'horse',
    elk: 'deer', moose: 'deer', reindeer: 'deer',
    stag: 'deer',
    // Small mammals
    mice: 'mouse', hamster: 'mouse', squirrel: 'rat',
    guinea: 'rabbit',
    // Primates
    gorilla: 'gorilla', chimp: 'monkey', chimpanzee: 'monkey',
    'spider monkey': 'monkey', baboon: 'monkey',
    // Big cats
    lion: 'tiger', leopard: 'jaguar', panther: 'jaguar', lynx: 'cheetah',
    // Bears / mustelids
    panda: 'panda', polarbear: 'bear', grizzly: 'bear', badger: 'badger',
    // Birds
    sparrow: 'sparrow', crow: 'raven', magpie: 'raven',
    eagle: 'hawk', falcon: 'hawk', vulture: 'hawk',
    pigeon: 'bird', robin: 'bird', finch: 'bird', canary: 'bird',
    hen: 'hen', rooster: 'rooster', cockerel: 'rooster',
    gosling: 'goose', goose: 'goose',
    pelican: 'seagull', albatross: 'seagull',
    // Reptiles
    toad: 'frog', salamander: 'frog',
    lizard: 'snake', crocodile: 'snake', alligator: 'snake', viper: 'cobra',
    tortoise: 'turtle',
    // Dinosaurs
    dino: 'dinosaur', trex: 'dinosaur', tyrannosaurus: 'dinosaur',
    brontosaurus: 'dinosaur', raptor: 'velociraptor', pterodactyl: 'dinosaur',
    // Sea creatures
    goldfish: 'fish', koi: 'fish', bass: 'fish', tuna: 'fish', trout: 'fish',
    nemo: 'clownfish',
    orca: 'killerwhale', 'killer whale': 'killerwhale',
    narwhal: 'narwhal',
    stingray: 'manta', ray: 'manta',
    lobster: 'crayfish', shrimp: 'crayfish',
    'sea lion': 'sealion', seal: 'sealion',
    'jelly fish': 'jellyfish',
    tentacle: 'octopus',
    // Insects
    moth: 'butterfly', caterpillar: 'butterfly',
    hornet: 'hornet', wasp: 'wasp',
    beetle: 'ladybug', ladybird: 'ladybug',
    insect: 'ant', bug: 'ant',
    cricket: 'grasshopper', locust: 'grasshopper',
    // Nature / plants
    plant: 'tree', bush: 'tree', palm: 'tree',
    oak: 'tree', pine: 'tree', maple: 'tree',
    pea: 'peapod', pod: 'peapod',
    // Space
    ufo: 'flyingsaucer', spaceship: 'flyingsaucer', spacecraft: 'flyingsaucer',
    globe: 'earth', planet: 'earth',
    // Vehicles
    truck: 'van', lorry: 'van',
    sailboat: 'boat', sailship: 'boat', ship: 'boat',
    'police car': 'policecar', cop: 'policecar',
    'go kart': 'gokart', kart: 'gokart',
    'paper airplane': 'paperairplane', airplane: 'paperairplane', plane: 'paperairplane',
    // Objects
    'ice cream': 'icecream', icecone: 'icecream',
    'traffic light': 'trafficlight',
    'stop sign': 'stopsign',
    'wind turbine': 'windturbine', windmill: 'windturbine',
    'flying saucer': 'flyingsaucer',
    controller: 'videogame', gamepad: 'videogame', console: 'videogame',
    'sand castle': 'sandcastle',
    'magnifying glass': 'magnifyingglass', lens: 'magnifyingglass',
    'wizard hat': 'wizardhat', hat: 'wizardhat',
    'graduation cap': 'graduationcap', mortarboard: 'graduationcap',
    'record player': 'recordplayer', turntable: 'recordplayer',
    watch: 'clock', timer: 'clock',
    // Food
    'pepperoni pizza': 'pizza', pie: 'pizza',
    melon: 'watermelon',
    candy: 'lollipop', sweet: 'lollipop',
    // Weather
    'lightning bolt': 'lightning', thunder: 'lightning', bolt: 'lightning',
    rain: 'cloud', storm: 'cloud',
    // School
    'school desk': 'schooldesk', desk: 'schooldesk',
    'paint kit': 'paintkit', paintbrush: 'paintkit', palette: 'paintkit',
    book: 'books', notebook: 'books', textbook: 'books',
    // Vehicles
    jet: 'airplane', aircraft: 'airplane',
    chopper: 'helicopter',
    // Space
    rocket: 'rocketship', 'space shuttle': 'spaceshuttle', shuttle: 'spaceshuttle',
    spaceman: 'astronaut', cosmonaut: 'astronaut',
    // Places
    home: 'house', building: 'house',
    fort: 'castle', palace: 'castle',
    // People
    captain: 'pirate',
    // Objects / tech
    headphone: 'headphones', earphones: 'headphones', earbuds: 'headphones',
    smartphone: 'phone', cellphone: 'phone', mobile: 'phone',
    television: 'tv', 'flat screen': 'tv', monitor: 'tv', telly: 'tv',
    organ: 'piano', keyboard: 'piano',
    'ferris wheel': 'ferriswheel',
};

// Each model is in a subfolder: public/assets/ar-models/cc-by/ or cc0/
const GLB_BASE = path.join('public', 'assets', 'ar-models');

function findGlbModel(identified: string): { modelUrl: string } | null {
    // Direct key lookup, then synonym fallback
    const key = GLB_MODELS[identified]
        ? identified
        : SYNONYM_MAP[identified] || null;
    const entry = key ? GLB_MODELS[key] : null;
    if (!entry) return null;

    // Resolve actual file path under the subfolder
    const filePath = path.join(GLB_BASE, entry.sub, entry.file);
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ AR: GLB registered but not found on disk: ${filePath}`);
        return null;
    }

    const encodedFile = encodeURIComponent(entry.file);
    return { modelUrl: `/assets/ar-models/${entry.sub}/${encodedFile}` };
}

// ─── AVAILABLE SUBJECT IDs (for suggestions when no GLB match) ───────────────
const ALL_SUBJECT_IDS = AVAILABLE_SUBJECTS.map(s => s.id);

function getRandomSuggestions(exclude: string, count = 4) {
    return ALL_SUBJECT_IDS
        .filter(id => id !== exclude)
        .sort(() => 0.5 - Math.random())
        .slice(0, count)
        .map(id => AVAILABLE_SUBJECTS.find(s => s.id === id)!);
}

// ─── GEMINI ANALYSIS PROMPT ──────────────────────────────────────────────────
const ANALYZE_PROMPT = `You are a friendly, enthusiastic art teacher for young children (ages 4-10). A child just showed you their drawing and you are SO excited to see it! You will analyze it with warmth, encouragement, and wonder.

The user may also provide a LABEL — what the child says they drew. Use it to compare.

## RESPONSE FORMAT

Return PURE JSON only. NO markdown, NO backticks, NO extra text.

{
  "identified": "cat",
  "identifiedVi": "Mèo",
  "emoji": "🐱",
  "accuracy": 72,
  "praise": "Vietnamese — what the child did GREAT (1-2 short sentences). Be specific about what you love in their drawing. Example: Ôi, bạn vẽ đôi mắt tròn xoe dễ thương quá đi! Cái đuôi cong cong trông rất giống mèo thật đấy!",
  "tip": "Vietnamese — ONE fun, easy drawing tip as if teaching a little kid. Frame it as a fun challenge, not criticism. Example: Thử vẽ thêm 3 sợi râu mỗi bên mũi nhé — mèo dùng râu để đo xem có chui vừa khe hẹp không đấy!",
  "description": "Vietnamese — 2-3 short WOW facts about this animal/object that kids find amazing. Use exclamation marks and fun language. Example: Mèo có thể xoay tai 180 độ như cái ra-đa! Chúng ngủ tới 16 tiếng mỗi ngày — nhiều hơn cả bạn nữa đấy!",
  "imagination": "Vietnamese — a creative, magical 'what-if' prompt to spark the child's imagination and make them want to draw more. Example: Thử tưởng tượng nếu chú mèo này biết bay thì sao nhỉ? Bạn thử vẽ cho mèo đôi cánh bướm xem nào!",
  "primaryColor": "#FF8C69",
  "accentColor": "#FFD1BA"
}

## RULES FOR IDENTIFICATION
1. "identified" = single lowercase English word (e.g. "cat", "rocket", "tree")
2. "identifiedVi" = Vietnamese name
3. If a label is provided and matches what you see, use it. If the label doesn't match, identify what you actually see but be gentle: "Bạn nói vẽ X nhưng trông giống Y hơn nè — cả hai đều tuyệt!"
4. Use the SIMPLEST common name (e.g. "cat" not "domestic shorthair")

## RULES FOR ACCURACY (0-100)
- 90-100: Highly recognizable, key features clear
- 70-89: Recognizable with some features missing
- 50-69: Somewhat recognizable, proportions need work
- 30-49: Hard to identify without the label
- 0-29: Very abstract

## TONE RULES (CRITICAL)
- You are talking to a CHILD, not an adult. Use simple words.
- NEVER say negative things like "thiếu", "sai", "chưa đúng", "không giống". Instead frame as: "thử thêm...", "sẽ vui hơn nếu..."
- Use exclamation marks! Be excited!
- Use fun comparisons and sounds (e.g. "tròn xoe", "dài ngoằng", "nhọn hoắt")
- "praise" must be PURELY positive — no "but" or "however"
- "tip" must feel like a fun game/challenge, not homework
- "imagination" should spark wonder and make the child want to draw immediately

## RULES FOR COLORS
- primaryColor: dominant real-life color of the subject (hex)
- accentColor: lighter/complementary accent (hex)`;

// ─── ROUTE: POST /api/ar/analyze ────────────────────────────────────────────
router.post('/ar/analyze', authenticate, async (req: Request, res: Response) => {
    try {
        const { imageData, label } = req.body;

        if (!imageData || typeof imageData !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Thiếu dữ liệu ảnh. Vui lòng thử lại!',
            });
        }

        // Strip data URI prefix
        const base64Match = imageData.match(/^data:image\/(\w+);base64,(.+)$/);
        if (!base64Match) {
            return res.status(400).json({
                success: false,
                error: 'Định dạng ảnh không hợp lệ!',
            });
        }

        const mimeType = `image/${base64Match[1]}`;
        const base64Data = base64Match[2];

        // Build prompt with optional label
        let prompt = ANALYZE_PROMPT;
        if (label && typeof label === 'string' && label.trim()) {
            prompt += `\n\nThe child says they drew: "${label.trim()}"`;
        }

        // ─── Step 1: Gemini Analysis ─────────────────────────────────────
        console.log('🔍 AR Step 1/2: Analyzing drawing with Gemini...');
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-lite-latest' });

        const imagePart = {
            inlineData: { data: base64Data, mimeType },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const rawText = result.response.text();

        // Parse JSON
        let analysis;
        try {
            const jsonText = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
            analysis = JSON.parse(jsonText);
        } catch {
            console.error('❌ AR: Failed to parse Gemini JSON:', rawText);
            return res.status(500).json({
                success: false,
                error: 'AI trả về dữ liệu không hợp lệ. Vui lòng thử lại!',
            });
        }

        if (!analysis.identified) {
            return res.status(500).json({
                success: false,
                error: 'Không thể nhận diện bức vẽ. Vui lòng thử lại!',
            });
        }

        const identified = String(analysis.identified).toLowerCase().replace(/[^a-z]/g, '');
        console.log(`✅ AR: Gemini identified → "${identified}"`);

        // ─── Step 2: Find matching GLB model ────────────────────────────
        const glb = findGlbModel(identified);
        const isInLibrary = !!glb;

        if (glb) {
            console.log(`🎮 AR Step 2/2: GLB found → ${glb.modelUrl}`);
        } else {
            console.log(`ℹ️ AR Step 2/2: No GLB for "${identified}" — returning suggestions.`);
        }

        const suggestions = isInLibrary ? [] : getRandomSuggestions(identified);

        res.json({
            success: true,
            data: {
                identified,
                identifiedVi: String(analysis.identifiedVi || identified),
                emoji: String(analysis.emoji || '✨'),
                accuracy: Math.max(0, Math.min(100, Number(analysis.accuracy) || 50)),
                praise: String(analysis.praise || 'Bức vẽ đẹp lắm! Bạn thật sáng tạo!'),
                tip: String(analysis.tip || 'Thử thêm nhiều màu sắc vào bức vẽ tiếp theo nhé!'),
                description: String(analysis.description || ''),
                imagination: String(analysis.imagination || 'Thử tưởng tượng nếu bức vẽ này biến thành thật thì sao nhỉ?'),
                modelType: isInLibrary ? 'glb' : 'none',
                modelUrl: isInLibrary ? glb!.modelUrl : '',
                primaryColor: String(analysis.primaryColor || '#4cae4f'),
                accentColor: String(analysis.accentColor || '#c8e6c9'),
                isInLibrary,
                suggestions,
            },
        });

    } catch (error: any) {
        console.error('❌ AR Analyze Error:', error);
        res.status(500).json({
            success: false,
            error: 'Lỗi khi phân tích hình ảnh. Vui lòng thử lại!',
            details: error.message,
        });
    }
});

// ─── ROUTE: GET /api/ar/credits ─────────────────────────────────────────────
// Public endpoint — no auth. Returns full CC-BY attribution list for display.
const CC_BY_CREDITS: Array<{ name: string; author: string; url: string }> = [
    { name: 'Airplane', author: 'Poly by Google', url: 'https://poly.pizza/m/a3XrQkLNna9' },
    { name: 'Ambulance', author: 'Poly by Google', url: 'https://poly.pizza/m/fssOg3PmDpY' },
    { name: 'Analog Clock', author: 'Poly by Google', url: 'https://poly.pizza/m/5gAoMR2YHs3' },
    { name: 'Ant', author: 'Poly by Google', url: 'https://poly.pizza/m/90PJjBye5ZC' },
    { name: 'Astronaut', author: 'Poly by Google', url: 'https://poly.pizza/m/dLHpzNdygsg' },
    { name: 'Avocado', author: 'Poly by Google', url: 'https://poly.pizza/m/4l7M6gOnbhd' },
    { name: 'Backpack', author: 'Alex Safayan', url: 'https://poly.pizza/m/5UQVd1Agl11' },
    { name: 'Badger', author: 'Poly by Google', url: 'https://poly.pizza/m/8k4cduyRhi4' },
    { name: 'Bamboo', author: 'Poly by Google', url: 'https://poly.pizza/m/auVD_m-ugF0' },
    { name: 'Banana', author: 'Poly by Google', url: 'https://poly.pizza/m/ahOO6wz8sV0' },
    { name: 'Beagle', author: 'Poly by Google', url: 'https://poly.pizza/m/0BnDT3T1wTE' },
    { name: 'Bedroom', author: 'Poly by Google', url: 'https://poly.pizza/m/9ycLAR71SmR' },
    { name: 'Bicycle', author: 'Poly by Google', url: 'https://poly.pizza/m/19VoUuA2pcN' },
    { name: 'Bison', author: 'Poly by Google', url: 'https://poly.pizza/m/9sTrha-TxdS' },
    { name: 'Black Bear', author: 'Poly by Google', url: 'https://poly.pizza/m/56ym_pyVnel' },
    { name: 'Blackboard', author: 'Poly by Google', url: 'https://poly.pizza/m/2Qv_L8pbv6W' },
    { name: 'Books', author: 'jeremy', url: 'https://poly.pizza/m/aXBH7oyJBu_' },
    { name: 'Broom', author: 'Poly by Google', url: 'https://poly.pizza/m/a8jocXHu7Od' },
    { name: 'Bus', author: 'Poly by Google', url: 'https://poly.pizza/m/4CPpvEmrMoF' },
    { name: 'Butterfly', author: 'Poly by Google', url: 'https://poly.pizza/m/e9NAQQrCbLu' },
    { name: 'Cabin', author: 'Poly by Google', url: 'https://poly.pizza/m/dTSrDa0oz0a' },
    { name: 'Camera', author: 'Poly by Google', url: 'https://poly.pizza/m/dp6b5ILj6At' },
    { name: 'Car', author: 'Poly by Google', url: 'https://poly.pizza/m/75h3mi6uHuC' },
    { name: 'Castle', author: 'jeremy', url: 'https://poly.pizza/m/0TfSw65gU2G' },
    { name: 'Cat', author: 'Poly by Google', url: 'https://poly.pizza/m/6dM1J6f6pm9' },
    { name: 'Cheetah', author: 'Poly by Google', url: 'https://poly.pizza/m/6V3uXmKROCU' },
    { name: 'Chick', author: 'Poly by Google', url: 'https://poly.pizza/m/7-uNQC5megf' },
    { name: 'Chicken', author: 'jeremy', url: 'https://poly.pizza/m/1YE8U35HXsI' },
    { name: 'Cloud', author: 'jeremy', url: 'https://poly.pizza/m/8CXbPO6p0n2' },
    { name: 'Cobra', author: 'Poly by Google', url: 'https://poly.pizza/m/40_5Xq467-U' },
    { name: 'Computer', author: 'Poly by Google', url: 'https://poly.pizza/m/2EHvZLax4Y3' },
    { name: 'Crab', author: 'Poly by Google', url: 'https://poly.pizza/m/2DgM36qZW2u' },
    { name: 'Crayfish', author: 'Poly by Google', url: 'https://poly.pizza/m/3Y2cocX0ILR' },
    { name: 'Doctor', author: 'jeremy', url: 'https://poly.pizza/m/0N-0gZmlVOb' },
    { name: 'Dog', author: 'Poly by Google', url: 'https://poly.pizza/m/4ioK8LxVtuP' },
    { name: 'Dragon', author: 'na3ee1', url: 'https://poly.pizza/m/WIOTISRjeX' },
    { name: 'Dragonfly', author: 'Poly by Google', url: 'https://poly.pizza/m/0myA_BOcZrD' },
    { name: 'Duck', author: 'Poly by Google', url: 'https://poly.pizza/m/6HpauUCfIAb' },
    { name: 'Earth', author: 'Poly by Google', url: 'https://poly.pizza/m/58PjkXNdpPb' },
    { name: 'Eel', author: 'Poly by Google', url: 'https://poly.pizza/m/9re2iW8tOnP' },
    { name: 'Elephant', author: 'Poly by Google', url: 'https://poly.pizza/m/a27MA0rXyyj' },
    { name: 'Ferris Wheel', author: 'jeremy', url: 'https://poly.pizza/m/cvRs_bHUF59' },
    { name: 'Ferruginous Hawk', author: 'Poly by Google', url: 'https://poly.pizza/m/6mUdkMMh2JT' },
    { name: 'Flamingo', author: 'Hmara Serhei', url: 'https://poly.pizza/m/5hUIvLVFqet' },
    { name: 'Flat-Screen TV', author: 'J-Toastie', url: 'https://poly.pizza/m/KmT5q0N2AH' },
    { name: 'Flower', author: 'Poly by Google', url: 'https://poly.pizza/m/eydI4__jXpi' },
    { name: 'Flying Saucer', author: 'Poly by Google', url: 'https://poly.pizza/m/fojR5i3h_nh' },
    { name: 'Giraffe', author: 'Poly by Google', url: 'https://poly.pizza/m/0VkNrGSGXOO' },
    { name: 'Go Kart', author: 'Poly by Google', url: 'https://poly.pizza/m/3hkutVs0AAV' },
    { name: 'Goat', author: 'Poly by Google', url: 'https://poly.pizza/m/d7dImmjtF8E' },
    { name: 'Goose', author: 'Poly by Google', url: 'https://poly.pizza/m/9wn3If7Qgb4' },
    { name: 'Gorilla', author: 'Poly by Google', url: 'https://poly.pizza/m/bmfQ1j9CeO2' },
    { name: 'Graduation Cap', author: 'Poly by Google', url: 'https://poly.pizza/m/4v0sRFH6PN9' },
    { name: 'Grasshopper', author: 'Poly by Google', url: 'https://poly.pizza/m/3VFH5hQvI8R' },
    { name: 'Great Horned Owl', author: 'Poly by Google', url: 'https://poly.pizza/m/fNkq9CwSG6d' },
    { name: 'Headphones', author: 'Alex Safayan', url: 'https://poly.pizza/m/0chwm1mLpRC' },
    { name: 'Helicopter', author: 'jeremy', url: 'https://poly.pizza/m/eb7b31pjGtQ' },
    { name: 'Hen', author: 'Poly by Google', url: 'https://poly.pizza/m/8Unya0rw9tR' },
    { name: 'Hippopotamus', author: 'Poly by Google', url: 'https://poly.pizza/m/eau2X1phgjJ' },
    { name: 'Hornet', author: 'Poly by Google', url: 'https://poly.pizza/m/6h7-AWppj5e' },
    { name: 'House', author: 'Poly by Google', url: 'https://poly.pizza/m/75V_MLvKMqM' },
    { name: 'Ice Cream', author: 'Poly by Google', url: 'https://poly.pizza/m/3qiDGMVEqmd' },
    { name: 'Island', author: 'Poly by Google', url: 'https://poly.pizza/m/bzLVwG4AzvA' },
    { name: 'Jaguar', author: 'Poly by Google', url: 'https://poly.pizza/m/4fb-oMr2uUF' },
    { name: 'Jellyfish', author: 'Poly by Google', url: 'https://poly.pizza/m/5PxIqPamrag' },
    { name: 'Killer Whale', author: 'Anthony Lever', url: 'https://poly.pizza/m/3a9GVBBAMs1' },
    { name: 'Kitten', author: 'Poly by Google', url: 'https://poly.pizza/m/dBJgGEu5bHW' },
    { name: 'Laptop', author: 'Poly by Google', url: 'https://poly.pizza/m/fEYeMIiRNHM' },
    { name: 'Lightning Bolt', author: 'Poly by Google', url: 'https://poly.pizza/m/7IBFbOFdkcp' },
    { name: 'Lollipop', author: 'Poly by Google', url: 'https://poly.pizza/m/eIb0hlFvPtS' },
    { name: 'Magnifying Glass', author: 'Poly by Google', url: 'https://poly.pizza/m/fvtGqQ6olh-' },
    { name: 'Moon', author: 'Poly by Google', url: 'https://poly.pizza/m/9OPocAqXM0u' },
    { name: 'Motorcycle', author: 'Poly by Google', url: 'https://poly.pizza/m/dse64pqMKAR' },
    { name: 'Narwhal', author: 'Poly by Google', url: 'https://poly.pizza/m/9nvsRtWPsHv' },
    { name: 'Octopus', author: 'Poly by Google', url: 'https://poly.pizza/m/9-b6-yqrwEe' },
    { name: 'Ostrich', author: 'Poly by Google', url: 'https://poly.pizza/m/1LtIviy4khn' },
    { name: 'Pagoda', author: 'Poly by Google', url: 'https://poly.pizza/m/1zS7ucaAd4J' },
    { name: 'Paint Kit Mini', author: 'Tiff Eidmann', url: 'https://poly.pizza/m/2_FO0E5vFOc' },
    { name: 'Panda', author: 'elkiotbear', url: 'https://poly.pizza/m/Wb5761uiZB' },
    { name: 'Paper Airplane', author: 'Poly by Google', url: 'https://poly.pizza/m/75WQH5E29tF' },
    { name: 'Parrot', author: 'Poly by Google', url: 'https://poly.pizza/m/dfNjMLtO0pd' },
    { name: 'Pen', author: 'Poly by Google', url: 'https://poly.pizza/m/c8-OE_JtLxV' },
    { name: 'Pencil', author: 'Jarlan Perez', url: 'https://poly.pizza/m/78Vy9pYbJCX' },
    { name: 'Penguin', author: 'Poly by Google', url: 'https://poly.pizza/m/fBXvsC6pe_V' },
    { name: 'Pepperoni Pizza', author: 'Poly by Google', url: 'https://poly.pizza/m/9IWGn64Fnqo' },
    { name: 'Phone', author: 'Alex Safayan', url: 'https://poly.pizza/m/1L9oJAw6nY2' },
    { name: 'Piano', author: 'jeremy', url: 'https://poly.pizza/m/7U-93vxPOER' },
    { name: 'Pirate', author: 'jeremy', url: 'https://poly.pizza/m/baCkFv7jhGo' },
    { name: 'Police Car', author: 'Poly by Google', url: 'https://poly.pizza/m/0-j0ksmXXtz' },
    { name: 'Poodle', author: 'Poly by Google', url: 'https://poly.pizza/m/eQmBaLcGbbE' },
    { name: 'Popsicle', author: 'Poly by Google', url: 'https://poly.pizza/m/534TY_Ie4jz' },
    { name: 'Puppy', author: 'Poly by Google', url: 'https://poly.pizza/m/3nFLBC3aXen' },
    { name: 'Rabbit', author: 'Poly by Google', url: 'https://poly.pizza/m/9OBTRVYUSmt' },
    { name: 'Rainbow', author: 'Poly by Google', url: 'https://poly.pizza/m/cNmJWvV7Piz' },
    { name: 'Raven', author: 'Poly by Google', url: 'https://poly.pizza/m/bnpgn6o5qNs' },
    { name: 'Record Player', author: 'Poly by Google', url: 'https://poly.pizza/m/4-d0cvpHjpS' },
    { name: 'Rhinoceros', author: 'Poly by Google', url: 'https://poly.pizza/m/7XutktqrTj_' },
    { name: 'Robot', author: 'Poly by Google', url: 'https://poly.pizza/m/9A6cuitiB_4' },
    { name: 'Rocketship', author: 'Gabriel Valdivia', url: 'https://poly.pizza/m/a5ChWS6uW0y' },
    { name: 'Rooster', author: 'Poly by Google', url: 'https://poly.pizza/m/6NTegstc5Jy' },
    { name: 'Sail Boat', author: 'Poly by Google', url: 'https://poly.pizza/m/7AOnch2wREC' },
    { name: 'Sand Castle', author: 'Poly by Google', url: 'https://poly.pizza/m/8PJfF1Q0B7T' },
    { name: 'Satellite', author: 'Poly by Google', url: 'https://poly.pizza/m/1C3zb8Q9USk' },
    { name: 'School Desk', author: 'Jonathan Granskog', url: 'https://poly.pizza/m/eP6XIy9ox83' },
    { name: 'Scorpion', author: 'Poly by Google', url: 'https://poly.pizza/m/6Bu7d_Pkm5o' },
    { name: 'Sea Lion', author: 'Poly by Google', url: 'https://poly.pizza/m/45HRvXYpvUG' },
    { name: 'Seagull', author: 'Poly by Google', url: 'https://poly.pizza/m/0WRzrtCIIRp' },
    { name: 'Seahorse', author: 'Poly by Google', url: 'https://poly.pizza/m/fkK7TgvkSVG' },
    { name: 'Snail', author: 'Poly by Google', url: 'https://poly.pizza/m/aZ_cT-AIu2y' },
    { name: 'Snowman', author: 'Poly by Google', url: 'https://poly.pizza/m/bN280ReeZvq' },
    { name: 'Space Shuttle', author: 'Poly by Google', url: 'https://poly.pizza/m/djxolbz_CYC' },
    { name: 'Sparrow', author: 'Poly by Google', url: 'https://poly.pizza/m/eVTHotZ9Bc_' },
    { name: 'Spider Monkey', author: 'Poly by Google', url: 'https://poly.pizza/m/4Ci4DWwucRd' },
    { name: 'Spotted Hyena', author: 'Poly by Google', url: 'https://poly.pizza/m/0yU1LU3Nkpu' },
    { name: 'Squid', author: 'Poly by Google', url: 'https://poly.pizza/m/aOY1Ae28E9k' },
    { name: 'Star', author: 'Poly by Google', url: 'https://poly.pizza/m/fvTSBuNRhXM' },
    { name: 'Stethoscope', author: 'Poly by Google', url: 'https://poly.pizza/m/aFuTGPz2uyL' },
    { name: 'Stop Sign', author: 'Poly by Google', url: 'https://poly.pizza/m/60GyU9CdZ9r' },
    { name: 'Table', author: 'jeremy', url: 'https://poly.pizza/m/93snYMCAMEb' },
    { name: 'Teacher', author: 'jeremy', url: 'https://poly.pizza/m/5v5j_lqOHTO' },
    { name: 'Teapot', author: 'Poly by Google', url: 'https://poly.pizza/m/3pxNWuQ-iii' },
    { name: 'Tiger', author: 'Poly by Google', url: 'https://poly.pizza/m/5A3w06FXUup' },
    { name: 'Traffic Light', author: 'Poly by Google', url: 'https://poly.pizza/m/57rxXzowK8w' },
    { name: 'Train', author: 'Poly by Google', url: 'https://poly.pizza/m/fm-ioGYuEhx' },
    { name: 'Tree', author: 'Marc Sola', url: 'https://poly.pizza/m/6Yjt8nIwLsD' },
    { name: 'Turtle', author: 'Poly by Google', url: 'https://poly.pizza/m/2LCcq8vhqJ3' },
    { name: 'Umbrella', author: 'Poly by Google', url: 'https://poly.pizza/m/ez4MoDQFgXz' },
    { name: 'Unicorn', author: 'Poly by Google', url: 'https://poly.pizza/m/212RNECqFCA' },
    { name: 'Unicycle', author: 'Poly by Google', url: 'https://poly.pizza/m/c4eT6ivB_Tm' },
    { name: 'Van', author: 'Poly by Google', url: 'https://poly.pizza/m/aT_24cDaW1a' },
    { name: 'Videogame', author: 'Poly by Google', url: 'https://poly.pizza/m/7jHiQIMZkRs' },
    { name: 'Volcano', author: 'Poly by Google', url: 'https://poly.pizza/m/4xoTMiF0D5J' },
    { name: 'Watermelon', author: 'jeremy', url: 'https://poly.pizza/m/5NXaNnNIzfC' },
    { name: 'Whale', author: 'Poly by Google', url: 'https://poly.pizza/m/fo1MBzTFRZ3' },
    { name: 'Wind Turbine', author: 'Poly by Google', url: 'https://poly.pizza/m/8Tke6WIyZtg' },
    { name: 'Wizard Hat', author: 'Poly by Google', url: 'https://poly.pizza/m/7VVumyY7L_u' },
];

router.get('/ar/credits', (_req, res) => {
    res.json({
        success: true,
        license: 'CC BY 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
        source: 'Poly Pizza',
        sourceUrl: 'https://poly.pizza',
        models: CC_BY_CREDITS,
    });
});

export default router;
