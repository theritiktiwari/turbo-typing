"use server";

import TestResultModel from "@/models/TestResult";
import { Response } from "@/types/response";
import { serverSession } from "@/helper/serverSession";
import { AdminCheck } from "@/services/users";

interface TestResultPayload {
    userId: string;
    wpm: number;
    wps: number;
    cpm: number;
    cps: number;
    accuracy: number;
    duration: number;
    language: string;
}

export async function addTestResult(payload: TestResultPayload) {
    try {
        const session = await serverSession();
        if (!session) {
            return new Response("Unauthorized Access.").error();
        }

        const testResult = new TestResultModel(payload);
        await testResult.save();

        return new Response("Test result added successfully.").success();
    } catch (error) {
        console.error("[ADD_TEST_RESULT]", error);
        return new Response("Something went wrong.").error();
    }
}

export async function getTestResults(payload?: { userId: string }) {
    try {
        const session = await serverSession();
        if (payload?.userId) {
            if (!session || session.user._id !== payload.userId) {
                return new Response("Unauthorized Access.").error();
            }
        } else {
            const unauthorize = AdminCheck(session);
            if (unauthorize) return unauthorize;
        }

        let testResults;
        if (payload?.userId) {
            testResults = await TestResultModel.find({ userId: payload.userId });
        } else {
            testResults = await TestResultModel.find().populate("userId");
        }

        if (!testResults) {
            return new Response("Test results not found.").error();
        }

        return new Response("Test results found.", testResults).data();
    } catch (error) {
        console.error("[GET_ALL_TEST_RESULTS]", error);
        return new Response("Something went wrong.").error();
    }
}

export async function getTestResultById(payload: { id: string }) {
    try {
        const session = await serverSession();
        const unauthorize = AdminCheck(session);
        if (unauthorize) return unauthorize;

        const testResult = await TestResultModel.findById(payload.id).populate("userId");
        if (!testResult) {
            return new Response("Test result not found.").error();
        }

        return new Response("Test result found.", testResult).data();
    } catch (error) {
        console.error("[GET_TEST_RESULT]", error);
        return new Response("Something went wrong.").error();
    }
}

export async function deleteTestResult(payload: { id: string }) {
    try {
        const session = await serverSession();
        const unauthorize = AdminCheck(session);
        if (unauthorize) return unauthorize;

        const testResult = await TestResultModel.findByIdAndDelete(payload.id);
        if(!testResult) {
            return new Response("Test result not found.").error();
        }

        return new Response("Test result deleted successfully.").success();
    } catch (error) {
        console.error("[DELETE_TEST_RESULT]", error);
        return new Response("Something went wrong.").error();
    }
}