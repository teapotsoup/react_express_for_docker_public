import { useEffect, useState } from "react";
import axios from "axios";
import { ReactDiagram } from 'gojs-react';
import * as go from 'gojs';
import styled from '@emotion/styled';
import './DiagramPage.css'

function initDiagram() {
    const $ = go.GraphObject.make;

    const diagram =
        $(go.Diagram,
            {
                initialAutoScale: go.Diagram.Uniform,
                'undoManager.isEnabled': true,
                'animationManager.isEnabled': false,
                'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
                model: new go.GraphLinksModel(
                    {
                        linkKeyProperty: 'key'
                    })
            });

    diagram.nodeTemplate =
        $(go.Node, 'Auto',
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, 'RoundedRectangle',
                { name: 'SHAPE', fill: 'white', strokeWidth: 0, desiredSize: new go.Size(100, 70) },
                new go.Binding('fill', 'color')),
            $(go.TextBlock,
                { margin: 8, editable: true },
                new go.Binding('text').makeTwoWay()
            )
        );
    return diagram;
}


function DiagramPage() {
    const [diagramData, setDiagramData] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/app/diagramData`)
            .then(({ data }) => {
                setDiagramData(data);
            })
            .catch(error => {
                console.error("Error fetching diagram data:", error);
            });
    }, []);

    return (
        <div>
            {diagramData && diagramData.message}
            <Wrapper>
                {diagramData &&
                            <ReactDiagram
                                initDiagram={initDiagram}
                                divClassName='diagram-component'
                                nodeDataArray={diagramData.nodeDataArray}
                                linkDataArray={diagramData.linkDataArray}
                            />
                }
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
    width: 1400px;
    height: 500px;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
`;

export default DiagramPage;
