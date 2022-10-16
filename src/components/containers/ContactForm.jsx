import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { settings } from "../../settings/settings";

const ContactForm = () => {
  const currentForm = useRef();

  const [serverSuccess, setServerSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    emailjs
      .sendForm(
        settings.emailjs_serviceid,
        settings.emailjs_templateid,
        currentForm.current,
        settings.emailjs_publickey
      )
      .then(
        (result) => {
          if (result.status === 200 && result.text) {
            setServerError(false);
            setServerSuccess("C'est envoyé ! Merci, je vous répond dés que possible.");
          }
        },
        (error) => {
          setServerSuccess(false);
          setServerError("Quelque chpse s'est mal passé durant l'envoi, veuillez réessayer ou me contacter via un canal différent.");
        }
      );
  };

  return (
    <form
      ref={currentForm}
      className="card -mt-1.5  space-y-4 p-4 md:p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="inputbox">
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          placeholder="Votre nom..."
          id="name"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <>
            {errors.name.type === "required" && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                Votre nom est requis!
              </p>
            )}
          </>
        )}
      </div>
      <div className="inputbox">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Votre e-mail..."
          id="email"
          {...register("email", {
            required: true,
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          })}
        />
        {errors.email && (
          <>
            {errors.email.type === "required" && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                Votre e-mail est requis!
              </p>
            )}
            {errors.email.type === "pattern" && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                Ca ne ressemble pas à un e-mail..
              </p>
            )}
          </>
        )}
      </div>
      <div className="inputbox">
        <label htmlFor="subject">Sujet</label>
        <input
          type="text"
          placeholder="Votre sujet..."
          id="subject"
          {...register("subject", { required: true })}
        />
        {errors.subject && (
          <>
            {errors.subject.type === "required" && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                Pas de sujet, pas de demande.
              </p>
            )}
          </>
        )}
      </div>
      <div className="inputbox">
        <label htmlFor="message">Message</label>
        <textarea
          placeholder="Votre message..."
          cols="1"
          rows="5"
          id="message"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <>
            {errors.message.type === "required" && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                Dites moi peut être ce que vous désirez ?
              </p>
            )}
          </>
        )}
      </div>
      {!serverSuccess && serverError && (
        <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
          {serverError}
        </p>
      )}
      {!serverError && serverSuccess && (
        <p className="bg-green-500 bg-opacity-5 text-center text-sm text-green-500">
          {serverSuccess}
        </p>
      )}
      <button type="submit" className="btn">
        <span>Envoyer</span>
      </button>
    </form>
  );
};

export default ContactForm;
