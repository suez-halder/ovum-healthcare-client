"use client";

type TParams = {
    params: {
        doctorId: string;
    };
};

const DoctorUpdatePage = ({ params }: TParams) => {
    console.log(params.doctorId);
    return (
        <div>
            <h1>Update Doctor Info</h1>
        </div>
    );
};

export default DoctorUpdatePage;
