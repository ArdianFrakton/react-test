import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import Input from './components/Input';

function App() {
  const [checkboxData, setData] = useState([]);
  const [renderData, setRenderdata] = useState([]);

  // const getInputs = (inputs, dataArr) => {
  //   let array = [];
  //   inputs.forEach((subChildInput) => {
  //     const ay = dataArr.filter((e) => (subChildInput.id === e.parent));
  //     array.push(ay);
  //   });
  //   return array;
  // };

  const getSortedCheckbox = (response) => {
    const arr = [];
    response.forEach((e) => {
      const checkParent = arr.find((el) => (el.id === e.id));
      if (!checkParent && (e.parent === 0)) {
        const x = response.filter((el) => el.parent === e.id);
        if (x) {
          const arrChild = [];
          x.forEach((childInput) => {
            const arrSubChild = [];
            const y = response.filter((event) => (childInput.id === event.parent));
            if (y) {
              y.forEach((subChildInput) => {
                const ay = response.filter((e) => (subChildInput.id === e.parent));
                const xxxxx = {...subChildInput, child: ay };
                arrSubChild.push(xxxxx);
              })
            }
            const aaa = {...childInput, subChild: arrSubChild };
            arrChild.push(aaa);
          })
          const test = {...e, child: arrChild };
            arr.push(test);
        }
      }
    });
    console.log('arr', arr);
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
      const results = datum?.map((obj) => ({ ...obj, defaultValue: true }));
      setData(results);
      getSortedCheckbox(results);
    });
  }, []);

  return (
    <div className="App">
      {renderData && (
        <div className="container">
          <h1>Ardian</h1>
          {
            renderData.map((element) => (
              <div key={element.id}>
                <Input
                  classNames="test"
                  id={element.id}
                  labelName={element.name}
                  defaultValue={element.defaultValue}
                  checked={(element.defaultValue || element.defaultValue)}
                  change={(event) => handleChange(event)}
                />
                {
                  element?.child.map((child) => (
                    <div key={child.id}>
                      <Input
                        classNames="mx-3"
                        id={child.id}
                        labelName={child.name}
                        defaultValue={child.defaultValue}
                        checked={(child.defaultValue || child.defaultValue)}
                        change={(event) => handleChange(event)}
                        checkStat={!element.defaultValue}
                      />
                      {
                        child?.subChild.map((subChild) => (
                          <div key={child.id}>
                            <Input
                              classNames="mx-5"
                              id={subChild.id}
                              labelName={subChild.name}
                              defaultValue={subChild.defaultValue}
                              checked={(subChild.defaultValue || subChild.defaultValue)}
                              change={(event) => handleChange(event)}
                              checkStat={!element.defaultValue || !child.defaultValue}
                            />
                             {
                                subChild?.child.map((obj) => (
                                  <div key={obj.id}>
                                    <Input
                                      key={obj.id}
                                      classNames="mx-5 px-5"
                                      id={obj.id}
                                      labelName={obj.name}
                                      defaultValue={obj.defaultValue}
                                      checked={(obj.defaultValue || obj.defaultValue)}
                                      change={(event) => handleChange(event)}
                                      checkStat={!element.defaultValue || !child.defaultValue || !subChild.defaultValue}
                                    />
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
            ))
          }
          </div>
      )}
    </div>
  );
}

export default App;
