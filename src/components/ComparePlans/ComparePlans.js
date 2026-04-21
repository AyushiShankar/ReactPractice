import React from "react";
import styles from "./ComparePlans.module.css";

export default function ComparePlans() {
  const plans = [
    {
      name: "Plan 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.",
      price: "$1000",
      covers: {
        C1: {
          title: "Liability To Third Party",
          value: false,
        },
        C2: { title: "Accidental Damage Cover", value: false },
        C3: { title: "Theft & Fire Cover", value: true },
        C4: { title: "Zero Depreciation Cover", value: false },
        C5: { title: "Engine Secure", value: true },
      },
    },
    {
      name: "Plan 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.",
      price: "$200",
      covers: {
        C1: {
          title: "Liability To Third Party",
          value: false,
        },
        C2: { title: "Accidental Damage Cover", value: true },
        C3: { title: "Theft & Fire Cover", value: true },
        C4: { title: "Zero Depreciation Cover", value: true },
        C5: { title: "Engine Secure", value: true },
      },
    },
    {
      name: "Plan 3",
      price: "$100",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.",
      covers: {
        C1: {
          title: "Liability To Third Party",
          value: true,
        },
        C2: { title: "Accidental Damage Cover", value: false },
        C3: { title: "Theft & Fire Cover", value: true },
        C4: { title: "Zero Depreciation Cover", value: false },
        C5: { title: "Engine Secure", value: false },
      },
    },
  ];

  return (
    <div className={styles["CmprPlns"]}>
      <div className={styles["headerRow"]}>
        <h1 className={styles["cmprPlnHdr"]}>Compare Plans</h1>
        <div className={styles["crossStack"]}>
          <img
            className={styles["crossImage"]}
            src="/images/cross.svg"
            alt="cross background"
          />
          <img
            className={styles["crossImg"]}
            src="/images/crossIcon.svg"
            alt="cross icon"
          />
        </div>
      </div>
      <div className={styles["planTypeContainers"]}>
        {plans.map((plan, id) => {
          return (
            <div key={id} className={styles["planName"]}>
              <img
                className={styles["planImage"]}
                src="/images/planName.svg"
                alt={`${plan.name} badge`}
              />
              <div className={styles["planContent"]}>
                <h2 style={{ color: "#264A9F" }}>{plan.name}</h2>
                <p
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                  }}
                >
                  {plan.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {Object.keys(plans[0].covers).map((coverKey, id) => {
          return (
            <div key={id} className={styles["coverRow"]}>
              <div className={styles["coverTitleContainer"]}>
                <p className={styles["coverTitle"]}>
                  {plans[0].covers[coverKey].title}
                </p>
                <img src="./images/toolTipBackground.svg" alt="tool_tip_backkground" />
              </div>

              <div className={styles["coverValues"]}>
                {plans.map((plan, id) => {
                  return (
                     <div key={id} className={styles["coverImageWrapper"]}>
                      <img className={styles["coverImage"]}
                      key={id}
                      src={
                        plan.covers[coverKey].value
                          ? "/images/tick.svg"
                          : "/images/false.svg"
                      }
                      alt={`${plan.name} ${coverKey} cover`}
                    />

                      </div>
                    
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
