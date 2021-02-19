import { Icon, Intent, Tab, Tabs } from '@blueprintjs/core';
import React from 'react';
import ReactJson from 'react-json-view';
const Details = () => (
  <div>
    <ReactJson
      name={false}
      displayDataTypes={false}
      src={{ data: { test: 'a' } }}
    />
  </div>
);
export const HookEvent = () => (
  <div>
    <div style={{ display: 'flex', padding: 20 }}>
      <div style={{ width: 400 }}>
        <p style={{ fontWeight: 'bold' }}>Today</p>
        <table
          style={{ width: '100%', fontFamily: 'monospace, arial' }}
          className="bp3-html-table .modifier"
        >
          <tbody>
            <tr style={{ backgroundColor: '#EBF1F5' }}>
              <td>
                <Icon intent={Intent.SUCCESS} icon="record" /> 201
              </td>
              <td>11:04:29</td>
              <td>POST</td>
              <td>/</td>
            </tr>
            <tr>
              <td>
                <Icon intent={Intent.SUCCESS} icon="record" /> 200
              </td>
              <td>09:01:32</td>
              <td>GET</td>
              <td>/user/10e36ab2</td>
            </tr>
          </tbody>
        </table>
        <p style={{ paddingTop: 20, fontWeight: 'bold' }}>20/02/2020</p>
        <table
          style={{ width: '100%', fontFamily: 'monospace, arial' }}
          className="bp3-html-table .modifier"
        >
          <tbody>
            <tr>
              <td>
                <Icon intent={Intent.DANGER} icon="record" /> 500
              </td>
              <td>11:04:29</td>
              <td>POST</td>
              <td>/</td>
            </tr>
            <tr>
              <td>
                <Icon intent={Intent.SUCCESS} icon="record" /> 200
              </td>
              <td>09:01:32</td>
              <td>GET</td>
              <td>/user/10e36ab2</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ marginLeft: 20 }}>
        <Tabs className="bp3-large" id="TabsExample" selectedTabId="rx">
          <Tab id="rx" title="Payload" panel={<Details />} />
          <Tab id="mb" title="Headers" panel={<div />} />
          <Tab id="mb" title="Response" panel={<div />} />
          <Tabs.Expander />
          <Tab
            id="rp"
            title={
              <div>
                <Icon icon="redo" /> Replay
              </div>
            }
            panel={<div />}
          />
        </Tabs>
      </div>
    </div>
  </div>
);
