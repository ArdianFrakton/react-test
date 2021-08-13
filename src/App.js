import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import Input from './components/Input';

function App() {
  const [checkboxData, setData] = useState([]);
  const [renderData, setRenderdata] = useState([]);

  const getSortedCheckbox = (response) => {
    const arr = [];
    response.forEach((e) => {
      const checkParent = arr.find((el) => (el.id === e.id));
      if (!checkParent && (e.parent === 0)) {
        const checkArr = response.filter((el) => el.parent === e.id);
        if (checkArr) {
          const arrChild = [];
          checkArr.forEach((childInput) => {
            const arrSubChild = [];
            const checkArray = response.filter((event) => (childInput.id === event.parent));
            if (checkArray) {
              checkArray.forEach((subChildInput) => {
                const getChild = response.filter((e) => (subChildInput.id === e.parent));
                const getSubChild = {...subChildInput, child: getChild };
                arrSubChild.push(getSubChild);
              })
            }
            const getChild = {...childInput, subChild: arrSubChild };
            arrChild.push(getChild);
          })
          const parentChild = {...e, child: arrChild };
          arr.push(parentChild);
        }
      }
    });
    setRenderdata(arr);
  };

  const handleChange = (event) => {
    const objIndex = checkboxData.findIndex((obj => obj.id === Number(event.target.name)))
    checkboxData[objIndex].defaultValue = !checkboxData[objIndex].defaultValue;
    setData(checkboxData);
    getSortedCheckbox(checkboxData);
  };

  useEffect(() => {
    fetch("https://frakton.dev/articles.php")
    .then(data => { return data.json() })
    .then(datum => {
      const results = datum?.map((obj) => ({ ...obj, defaultValue: false }));
      setData(results);
      getSortedCheckbox(results);
    });
  }, []);

  return (
    <div className="App">
      {renderData && (
        <div className="container">
          <h1>Detyre si parapergaditje e nje workshopi</h1>
          {
            renderData?.map((element) => (
              <div className="border-top py-3" key={element.id}>
                <Input
                  classNames="test"
                  id={element.id}
                  labelName={element.name}
                  defaultValue={element.defaultValue}
                  checked={element.defaultValue}
                  change={(event) => handleChange(event)}
                />
                {
                  element.defaultValue && element?.child.map((child) => (
                    <div key={child.id}>
                      <Input
                        classNames="mx-3"
                        id={child.id}
                        labelName={child.name}
                        defaultValue={child.defaultValue}
                        checked={child.defaultValue}
                        change={(event) => handleChange(event)}
                        checkStat={!element.defaultValue}
                      />
                      {
                        child.defaultValue && child?.subChild.map((subChild) => (
                          <div key={subChild.id}>
                            <Input
                              classNames="mx-5"
                              id={subChild.id}
                              labelName={subChild.name}
                              defaultValue={subChild.defaultValue}
                              checked={subChild.defaultValue}
                              change={(event) => handleChange(event)}
                              checkStat={!element.defaultValue || !child.defaultValue}
                            />
                             {
                              subChild.defaultValue && subChild?.child.map((obj) => (
                                <Input
                                  key={obj.id}
                                  classNames="mx-5 px-5"
                                  id={obj.id}
                                  labelName={obj.name}
                                  defaultValue={obj.defaultValue}
                                  checked={obj.defaultValue}
                                  change={(event) => handleChange(event)}
                                  checkStat={!element.defaultValue || !child.defaultValue || !subChild.defaultValue}
                                />
                              ))
                            }
                          </div>
                        ))
                      }
                    </div>
                  ))
                }
              </div>
            ))
          }
          </div>
      )}
    </div>
  );
}

export default App;
