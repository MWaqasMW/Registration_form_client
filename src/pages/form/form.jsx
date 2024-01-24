
// for singal images

// import React, { useState } from 'react';

// const Form = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         name: '',
//         course: '',
//         password: '',
//         file: null,
//     });

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: files ? files[0] : value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const apiEndpoint = 'http://localhost:3000/api/v1/createstudent';
//         const form = new FormData();

//         // Append form data
//         Object.entries(formData).forEach(([key, value]) => {
//             form.append(key, value);
//         });

//         // Make the API request
//         try {
//             const response = await fetch(apiEndpoint, {
//                 method: 'POST',
//                 body: form,
//             });

//             if (response.ok) {
//                 // Handle success
//                 console.log('Data sent successfully', response);
//             } else {
//                 // Handle error
//                 console.error('Error sending data');
//             }
//         } catch (error) {
//             console.error('Error sending data:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="email">Email</label>
//                 <div>
//                     <input type="email" name="email" onChange={handleChange} />
//                 </div>
//             </div>
//             <div>
//                 <label htmlFor="name">Name</label>
//                 <div>
//                     <input type="text" name="name" onChange={handleChange} />
//                 </div>
//             </div>
//             <div>
//                 <label htmlFor="course">Course</label>
//                 <div>
//                     <input type="text" name="course" onChange={handleChange} />
//                 </div>
//             </div>
//             <div>
//                 <label htmlFor="password">Password</label>
//                 <div>
//                     <input type="text" name="password" onChange={handleChange} />
//                 </div>
//             </div>
//             <div>
//                 <label htmlFor="file">File</label>
//                 <div>
//                     <input type="file" name="file" onChange={handleChange} />
//                 </div>
//             </div>
//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default Form;

// for multiply images 
import React, { useState } from 'react';

const Form = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        course: '',
        password: '',
        files: [], // Array to store multiple files
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'files' ? files : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiEndpoint = 'http://localhost:3000/api/v1/createstudent';
        const form = new FormData();

        // Append form data
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'files') {
                for (let i = 0; i < value.length; i++) {
                    form.append(`files`, value[i]); // Use the same key for each file
                }
            } else {
                form.append(key, value);
            }
        });

        // Make the API request
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                body: form,
            });

            if (response.ok) {
                // Handle success
                console.log('Data sent successfully');
            } else {
                // Handle error
                console.error('Error sending data');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <div>
                    <input type="email" name="email" onChange={handleChange} />
                </div>
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <div>
                    <input type="text" name="name" onChange={handleChange} />
                </div>
            </div>
            <div>
                <label htmlFor="course">Course</label>
                <div>
                    <input type="text" name="course" onChange={handleChange} />
                </div>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <div>
                    <input type="text" name="password" onChange={handleChange} />
                </div>
            </div>
            <div>
                <label htmlFor="files">Files</label>
                <div>
                    <input type="file" name="files" onChange={handleChange} multiple />
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;


