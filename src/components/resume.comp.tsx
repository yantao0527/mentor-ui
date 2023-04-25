import { Component, SyntheticEvent } from "react";
//import { Formik, Field, Form, useField, ErrorMessage } from "formik";
//import * as Yup from "yup";

import ChatService from "../services/chat.service";

type Props = {};

type State = {
    resume: string,
    job: string,
    loading: boolean,
    showResult: boolean,
    result: string,
}

// const MyTextArea = ({label, ...props}) => {
//     // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//     // which we can spread on <input> and alse replace ErrorMessage entirely.
//     const [field, meta] = useField(props);
//     return (
//         <>
//             <label htmlFor={props.id || props.name}>{label}</label>
//             <textarea className="text-area" {...field} {...props} />
//             {meta.touched && meta.error ? (
//                 <div className="error">{meta.error}</div>
//             ) : null}
//         </>
//     );
// };
  
  
export default class Resume extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
        resume: "",
        job: "",
        loading: false,
        showResult: true,
        result: "",
    };
  }

//   validationSchema() {
//     return Yup.object().shape({
//       resume: Yup.string()
//         .test(
//           "len",
//           "The resume must be more thant 20 characters.",
//           (val: any) =>
//             val &&
//             val.toString().length >= 20
//         )
//         .required("This field is required!"),
//       job: Yup.string()
//         .required("This field is required!"),
//     });
//   }

  handleImprove = (e: SyntheticEvent) => {
    e.preventDefault();

    const { resume, job } = this.state;
    //console.log(resume);

    this.setState({
        loading: true
    });
  
    ChatService.improve_resume(
      resume,
      job,
    ).then(
      response => {
        this.setState({
          loading: false,
          showResult: true,
          result: response.data.message,
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.detail) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          showResult: true,
          result: resMessage
        });
      }
    );
  }

  render() {
    // const [resume, setResume] = useState("");
    // const [job, setJob] = useState("");
    const { resume, job, loading, showResult, result } = this.state;

    // const initialValues = {
    //     resume: "",
    //     job: "",
    // };

    return (
      <div className="container">
            <form onSubmit={this.handleImprove}>
                  <div className="form-group">
                  <label htmlFor="resume"> Resume </label>
                    <textarea name="resume"
                      className="form-control"
                      rows={5}
                      value={resume}
                      onChange={e => this.setState({resume: e.target.value})}
                      onInput={e => {
                        e.currentTarget.style.height='auto';
                        e.currentTarget.style.height=e.currentTarget.scrollHeight+'px';
                      }}
                      aria-label="With textarea">
                    </textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="job"> Job Description </label>
                    <textarea name="job"
                      className="form-control"
                      rows={5}
                      value={job}
                      onChange={e => this.setState({job: e.target.value})}
                      onInput={e => {
                        e.currentTarget.style.height='auto';
                        e.currentTarget.style.height=e.currentTarget.scrollHeight+'px';
                      }}
                      aria-label="With textarea">
                    </textarea>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Improve</span>
                </button>
                  </div>
            </form>


        {showResult && (
            <div className="container">
              <h3>Improved Result</h3>
              <textarea name="result"
                      className="form-control"
                      rows={50}
                      defaultValue={result}
                      readOnly
                      onInput={e => {
                        e.currentTarget.style.height='auto';
                        e.currentTarget.style.height=e.currentTarget.scrollHeight+'px';
                      }}
                      aria-label="With textarea">
                    </textarea>
            </div>
        )}
      </div>
    );
  }
}
