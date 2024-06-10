import Modal from "react-modal";
import React, { useContext, useState, useEffect } from "react";
import MyContext from "../../../context/Context";
import Award from "../../atoms/award/Award";
import Button from "../../atoms/Button";
import { RxTrackNext } from "react-icons/rx";
import { IoIosCloseCircleOutline } from "react-icons/io";

const AwardModal = ({ isVisible, onClose, awards }) => {
  const { ctxUser, ctxSeason } = useContext(MyContext);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <Modal isOpen={true}>
      {/* <div className="award-modal__close">
        <IoIosCloseCircleOutline size={40} />
      </div> */}
      {ctxSeason && (
        <div className="award-modal">
          {awards.length === 1 && (
            <span className="award-modal__title">¡Has ganado este premio!</span>
          )}
          {awards.length > 1 && (
            <span className="award-modal__title">
              ¡Has ganado estos premios!
            </span>
          )}
          <div className="award-modal__list">
            {awards.map((itemAward) => {
              const award = ctxSeason?.awards.find(
                (awardSession) => awardSession.id === itemAward
              );

              return (
                <div className="award-modal__award">
                  {<Award icon={award.html} text={award.name} active={true} />}
                </div>
              );
            })}
          </div>
          <Button
            onPress={onClose}
            icon=""
            className={"super-button"}
            text={
              <div class="home__button-add">
                <span class="home__button-add-text">Continuar</span>
                <RxTrackNext
                  size={24}
                  color="white"
                  style={{ marginLeft: 8 }}
                />
              </div>
            }
          />
        </div>
      )}
    </Modal>
  );
};

const styles = {
  modalContent: {},
  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingBottom: 80,
  },
};

export default AwardModal;
