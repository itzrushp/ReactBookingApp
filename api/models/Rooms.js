import mongoose from 'mongoose';

const Roomchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    desc: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true,

    },
    maxPeople: {
        type: Number,
        required: true
    },
    roomNumbers: {
        type: [{ number: Number, unavailableDates: { type: [Date] } }], 
    }
}, { timestamps: true });
// {
//     { number: 101, unavailableDates: [01.05.2025 , 02.05.2025] }
//     { number: 102, unavailableDates: [08.05.2025 , 02.06.2025] }
//     { number: 103, unavailableDates: [01.05.2025 , 02.05.2025] }
// }

export default mongoose.model('Room', Roomchema);
