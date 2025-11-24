// const API_BASE_URL = "https://fionwebbackend.onrender.com" 
const API_BASE_URL = "http://127.0.0.1:8000";
async function handleResponse(res) {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`API error ${res.status}: ${text}`);
    }
    return res.json();
}

export async function fetchSkillsOnDomain(domain="software") {
    const res = await fetch(`${API_BASE_URL}/skills/basic/domain/${domain}`);
    return handleResponse(res);
}
export async function fetchRequiredSkillsofNeededType(domain = "software") {
    const res = await fetch(`${API_BASE_URL}/skills/${domain}`);
    return handleResponse(res);
}

export async function fetchAllSkills() {
    const res = await fetch(`${API_BASE_URL}/skills/basic/`);
    return handleResponse(res);
}

export async function fetchAllCertification() {
    const res = await fetch(`${API_BASE_URL}/certifications/`);
    return handleResponse(res);
}

export async function fetchCertificationsOnDomain(domain="software") {
    const res = await fetch(`${API_BASE_URL}/certifications/get/${domain}`);
    return handleResponse(res);
}

export async function fetchSoftwareProjects() {
    const res = await fetch(`${API_BASE_URL}/software-projects/`);
    return handleResponse(res);
}
export async function fetchSoftwareJobExperience() {
    const res = await fetch(`${API_BASE_URL}/job-experiences/domain/software`);
    return handleResponse(res);
}

// data section
export async function fetchDataCertifications() {
    const res = await fetch(`${API_BASE_URL}/certifications/get/data`);
    return handleResponse(res);
}

export async function fetchDataSkills() {
    const res = await fetch(`${API_BASE_URL}/skills/basic/domain/data`);
    return handleResponse(res);
}

export async function fetchDataProjects() {
    const res = await fetch(`${API_BASE_URL}/data-projects`);
    return handleResponse(res);
}

export async function fetchDataJobExperience() {
    const res = await fetch(`${API_BASE_URL}/job-experiences/domain/data`);
    return handleResponse(res);
}

// finance 
export async function fetchFinanceCertifications() {
    const res = await fetch(`${API_BASE_URL}/certifications/get/finance`);
    return handleResponse(res);
}

export async function fetchFinanceSkills() {
    const res = await fetch(`${API_BASE_URL}/skills/basic/domain/finance`);
    return handleResponse(res);
}

export async function fetchFinanceProjects() {
    const res = await fetch(`${API_BASE_URL}/finance-projects`);
    return handleResponse(res);
}

export async function fetchFinanceJobExperience() {
    const res = await fetch(`${API_BASE_URL}/job-experiences/domain/finance`);
    return handleResponse(res);
}

export async function fetchGeneralAnalyses(status) {
    const res = await fetch(
        `${API_BASE_URL}/general-analysis/?status=${encodeURIComponent(status)}`
    );
    return handleResponse(res);
}

// slug fetch

export async function fetchGeneralBySlug(slug) {
    const res = await fetch(
        `${API_BASE_URL}/general-analysis/slug/${slug}`
    )
    return handleResponse(res)
}

export async function fetchSoftwareProjBySlug(slug) {
    const res = await fetch(
        `${API_BASE_URL}/software-projects/slug/${slug}`
    )
    return handleResponse(res)
}

export async function fetchFinanceProjBySlug(slug) {
    const res = await fetch(
        `${API_BASE_URL}/finance-projects/slug/${slug}`
    )
    return handleResponse(res)
}

export async function fetchDataProjBySlug(slug) {
    const res = await fetch(
        `${API_BASE_URL}/data-projects/slug/${slug}`
    )
    return handleResponse(res)
}