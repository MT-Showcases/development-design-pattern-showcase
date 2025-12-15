/**
 * COMPONENT TYPE: Presentational
 * SECTION: UI Components
 *
 * ROLE:
 * - Display pattern code examples with title and code block
 * - Toggle solution visibility (pattern names and explanations)
 * - Provide progressive disclosure learning experience
 *
 * PATTERNS USED:
 * - Presentational Component - Receives data and callbacks via props
 * - Composition Pattern - Composes CodeBlock and Ant Design components
 * - Progressive Disclosure - Hide/reveal solution on demand
 *
 * NOTES FOR CONTRIBUTORS:
 * - Keep component stateless (solution visibility managed by parent)
 * - Use Ant Design Card for consistent styling
 * - Tag components for pattern badges
 * - Alert for solution explanation
 */

"use client";

import type { PatternExample } from "@/lib/types";
import { translateCategory } from "@/lib/i18n";
import CodeBlock from "../CodeBlock/CodeBlock";
import { Card, Button, Tag, Alert, Space, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "./ExampleViewer.scss";

interface ExampleViewerProps {
    example: PatternExample;
    solutionRevealed: boolean;
    onRevealSolution: () => void;
}

export default function ExampleViewer({
    example,
    solutionRevealed,
    onRevealSolution,
}: ExampleViewerProps) {
    // PATTERN: Progressive Disclosure - Show solution only when requested
    return (
        <div className="example-viewer__container">
            <Card className="example-viewer__card">
                <Space vertical size="large" className="w-full">
                    {/* Example Title */}
                    <div>
                        <h3 className="text-2xl font-bold">{example.title}</h3>
                        <Tag color="blue">{translateCategory(example.category)}</Tag>
                    </div>

                    {/* Code Block */}
                    <div className="example-viewer__code-section">
                        <CodeBlock
                            code={example.code}
                            language="javascript"
                            title={example.title}
                            context={`Esempio di ${translateCategory(
                                example.category
                            )} pattern dal quiz Design Pattern Showcase`}
                        />
                    </div>

                    {/* Solution Reveal Button or Solution Content */}
                    {!solutionRevealed ? (
                        <Button
                            type="primary"
                            size="large"
                            icon={<EyeOutlined />}
                            onClick={onRevealSolution}
                            block
                        >
                            Rivela soluzione
                        </Button>
                    ) : (
                        <Space orientation="vertical" size="large" className="w-full">
                            {/* Pattern Tags */}
                            <div>
                                <strong className="mr-2">Pattern:</strong>
                                {example.solutionPatterns.map((pattern, index) => (
                                    <Tag color="green" key={index}>
                                        {pattern}
                                    </Tag>
                                ))}
                            </div>

                            {/* Overall Explanation */}
                            <Alert
                                title="Spiegazione"
                                description={
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: example.solutionExplanation,
                                        }}
                                    />
                                }
                                type="info"
                                showIcon
                            />

                            {/* Step-by-Step Breakdown */}
                            {example.solutionSteps &&
                                example.solutionSteps.length > 0 && (
                                    <div>
                                        <Typography.Title level={4}>
                                            Breakdown step-by-step:
                                        </Typography.Title>

                                        <Space
                                            orientation="vertical"
                                            size="large"
                                            className="w-full"
                                        >
                                            {example.solutionSteps.map((step, index) => (
                                                <Card
                                                    key={index}
                                                    size="small"
                                                    title={`Step ${index + 1}: ${
                                                        step.title
                                                    }`}
                                                    className="!p-4"
                                                >
                                                    <Space
                                                        orientation="vertical"
                                                        size="middle"
                                                        className="w-full"
                                                    >
                                                        <Typography.Text>
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: step.description,
                                                                }}
                                                            />
                                                        </Typography.Text>
                                                        <CodeBlock
                                                            code={step.code}
                                                            language="javascript"
                                                            showPlayground={false}
                                                            showChatGPT={false}
                                                            showCopy={true}
                                                        />
                                                    </Space>
                                                </Card>
                                            ))}
                                        </Space>
                                    </div>
                                )}

                            {/* Advantages */}
                            {example.solutionAdvantages &&
                                example.solutionAdvantages.length > 0 && (
                                    <Alert
                                        title="Vantaggi"
                                        description={
                                            <ul className="list-disc pl-5 m-0">
                                                {example.solutionAdvantages.map(
                                                    (advantage, index) => (
                                                        <li key={index}>{advantage}</li>
                                                    )
                                                )}
                                            </ul>
                                        }
                                        type="success"
                                        showIcon
                                    />
                                )}
                        </Space>
                    )}
                </Space>
            </Card>
        </div>
    );
}
