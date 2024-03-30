import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { GiAirplaneDeparture, GiPartyPopper, GiRollingSuitcase, GiTakeMyMoney } from "react-icons/gi"
import { Box, Typography, Divider, useTheme, InputBase } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import WidgetCloseButton from "./WidgetCloseButton";

export default function BudgetWidget(props) {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const [goalReached, setGoalReached] = React.useState(false)
  const [showDonut, setShowDonut] = React.useState(false)
  const [editGoal, setEditGoal] = React.useState(false)
  const [budgetData, setBudgetData] = React.useState(JSON.parse(localStorage.getItem("budgetInfo")) || {
    goalAmount: 0,
    totalSaved: 0,
    amountToAdd: '',
    amountRemaining: 0 
  })

  const budgetIcon = goalReached ? <GiPartyPopper /> :
                     budgetData.amountRemaining < (budgetData.goalAmount * .3) ? <GiAirplaneDeparture /> : 
                     budgetData.amountRemaining < (budgetData.goalAmount * .5) ? <GiRollingSuitcase /> :
                     <GiTakeMyMoney />

  const budgetMessage = goalReached ? "Congratulations you've reached your goal!" :
                     budgetData.amountRemaining < (budgetData.goalAmount * .3) ? "Do you want window or aisle?" : 
                     budgetData.amountRemaining < (budgetData.goalAmount * .5) ? "Will it be swimsuits or parkas?":
                    "Stay focused on your saving."
        
  
                    
  React.useEffect(() => {
    localStorage.setItem("budgetInfo", JSON.stringify(budgetData))
    if(budgetData.goalAmount !== 0 && budgetData.totalSaved !== 0) {
      if(budgetData.goalAmount <= budgetData.totalSaved) {
        setGoalReached(true)
      }
      else {
        setGoalReached(false)
      }
    }
  }, [budgetData])

  function handleChange(event) {
    setBudgetData(prevBudgetData => {
        return {
            ...prevBudgetData,
            [event.target.name]: event.target.value
        }
    })
  }

  function handleCurrencyInput(event) {
    setBudgetData(prevBudgetData => {
        return {
            ...prevBudgetData,
            [event.target.name]: event.target.value
        }
    })
  }

  function showDonutGraph() {
    setShowDonut(true)
    setEditGoal(false)
  }

  function hideDonutGraph() {
    setShowDonut(false)
  }
  
  function clearInput() {
    setBudgetData(prevBudgetData => {
      return {
        ...prevBudgetData,
        amountToAdd: ''
      } 
    })
  }

  function calculateBudget(event) {
    event.preventDefault()
    setEditGoal()
    if(budgetData.amountToAdd) {
      setBudgetData(prevBudgetData => {
        return {
            ...prevBudgetData,
            amountRemaining: (budgetData.goalAmount - (parseFloat(budgetData.totalSaved) + parseFloat(budgetData.amountToAdd))).toFixed(2),
            totalSaved: parseFloat(prevBudgetData.amountToAdd) + parseFloat(prevBudgetData.totalSaved),         
        }
      })
    }
    clearInput()
  }

  function editGoalAmount() {
    setShowDonut(false)
    setEditGoal(prevState => !prevState)
    setBudgetData(prevBudgetData => {
      return {
        ...prevBudgetData,
        amountRemaining: prevBudgetData.goalAmount
      }
    })
  }

  function resetTotalSaved() {
    setGoalReached(false)
    setBudgetData(prevBudgetData => {
      return {
        ...prevBudgetData,
        totalSaved: 0,
        amountRemaining: prevBudgetData.goalAmount
      }
    })
  }



ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Amount Remaining', 'Amount Saved'],
  datasets: [
    {
      label: '$',
      data: [ budgetData.amountRemaining, budgetData.totalSaved],
      backgroundColor: [
     
        'rgba(114, 114, 114, 0.4)',
        'rgba(79, 208, 231, 0.4)',

      ],
      borderColor: [
      
        'rgba(114, 114, 114)',
        'rgba(79, 208, 231)',
      ],
      borderWidth: 1,
    },
  ],
};

  return (
    <>
      {!data ? 
      <Typography className="loading">Loading...</Typography> :
      <WidgetWrapper className="budget-container budget-container-reset widget-radius" style={{ display: props.showWidgets.showBudgetWidget ? '': 'none'}}>
        <div className="budget-content-btns">
          <p className={`budget-btn-text ${editGoal ? "edit-active" : ""} ${!editGoal && budgetData.goalAmount === 0 || budgetData.goalAmount === '0' ? "goal" : ""}`} onClick={editGoalAmount}>{editGoal ? 'Save' : !editGoal && budgetData.goalAmount === 0 || budgetData.goalAmount === '0' ? 'Set' : 'Edit'} Goal</p>
          <p className="budget-btn-text" onClick={resetTotalSaved}>Reset Saved</p>
          <p className={`budget-btn-text ${showDonut ? "" : "active"}`} onClick={hideDonutGraph}>Details</p>
          <p className={`budget-btn-text ${showDonut ? "active" : ""}`} onClick={showDonutGraph}>Graph</p>
        </div>
        <WidgetCloseButton
        closeWidgetFunction={props.toggleBudgetWidget}
        ></WidgetCloseButton>

        <div className="budget-content">
          <form className="budget-form">
            <InputBase
              type="number"  
              name="amountToAdd"           
              className="amount-saved-input"
              placeholder="Amount To Add"
              value={budgetData.amountToAdd}
              onChange={handleCurrencyInput}
            />
            <button
              className="budget-add-btn"
              onClick={calculateBudget}
            >
            +
            </button>
          </form>
          {showDonut ? <div className="budget-graph">
            <Doughnut 
              className="donut-graph"
              data={data}  
            />
          </div> : null}
          
          {!showDonut ? 
          <div className="budget-text">
            <div className="budget-goal-container">
              <div className="budget-line-item">
                <p className="budget-number goal">Your {props.searchParam} Goal:</p> {editGoal ? 
                  <input
                    type="number"  
                    name="goalAmount"           
                    className="goal-input"
                    placeholder="Goal Amnt"
                    value={budgetData.goalAmount}
                    onChange={handleChange}
                  /> 
                  : <p>${parseFloat((budgetData.goalAmount)).toFixed(2)}</p>
                }
              </div>
              <div className="budget-line-item">
                <p className="budget-number saved">Saved So Far:</p><p>${(budgetData.totalSaved).toFixed(2)}</p>
              </div>

              <div className="budget-graphic-container"></div>

              <div className="budget-line-item to-go">
                <p className="budget-number message">{budgetMessage}</p>
                <div className="budget-number icon">
                  {budgetIcon}
                </div>
               {!goalReached ? 
               <p 
                  className="budget-number message"
                  onChange={handleChange}>
                    You've got <span>${(budgetData.goalAmount - budgetData.totalSaved).toFixed(2)}</span> to go!
               </p> : ""}
              </div>      
            </div>
          </div> : null}
        </div>
      </WidgetWrapper>
      }
    </>
  )
}