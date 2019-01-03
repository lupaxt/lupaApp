import React, {useState} from 'react'
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";

import {capitalizeFirstLetter} from "../utils";
import {createGroup} from "../apis/mutations";
import {getGroupByName} from "../apis/query";

const CreateGroup = ({touched, values, errors}) => {
    const {name, description} = values;
    return <>
        <div className="title">Create a Group</div>
        <Form>
            <div>
                <Field name="name" value={name.trim().toLowerCase()} placeholder={"group name. lowercased. no spaces"}/>
                {errors.name && <div>{errors.name}</div>}

                <Field style={{width: "300px"}} name="description" value={description} placeholder={"Say a little bit about your group"}/>
                {touched.description && errors.description && <div>{errors.description}</div>}

            </div>
            <div className="error"/>
            {errors.submitter && <p>{errors.submitter}</p>}

            <button type="submit" title="Create Group" disabled={!description || !name}>
                Submit
            </button>
        </Form>
    </>;
};
const CreateGroupMeta = withFormik({
    mapPropsToValues: () => ({
        name: "",
        description: "",
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required("Your group needs a display name")
            .min(3, "minimum 3 chars")
            .max(16, "20 characters is the limit right now")
            .matches(/^([a-z\d]+_)*[a-z\d]+$/i, "no weird signs pls"),
        description: Yup.string()
            .required("Put a group description there")
            .min(10, "Tell me a bit more... about the group")
            .max(80, "80 characters max for now. Thanks")
    }),
    async handleSubmit(
        {description, name} /* form values */,
        {resetForm, setErrors, setSubmitting} /* formikExtras */
    ) {
        try {
            const data = await getGroupByName(name);
            // console.log(data, "getname");
            if (data.groupByName) {
                setErrors({submitter: "Groupname is taken :( "});
                return;
            }
        } catch (error) {
            setErrors({submitter: error.message});
            return;
        }

        try {
            const data = await createGroup(name, description);
            setErrors({submitter: `Group ${name} created!`});
        } catch (error) {
            setErrors({submitter: error.message});
        }

        setSubmitting(false);
    }
});

export default CreateGroupMeta(CreateGroup);

