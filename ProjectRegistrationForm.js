import React, { useState } from 'react';

function ProjectRegistrationForm() {
  const [projectType, setProjectType] = useState('');
  const [programmingLanguage, setProgrammingLanguage] = useState('');
  const [frameworks, setFrameworks] = useState([]);
  const [designType, setDesignType] = useState('');
  const [designTools, setDesignTools] = useState([]);
  const [consultingArea, setConsultingArea] = useState('');
  const [previousExperience, setPreviousExperience] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');
  const [deadline, setDeadline] = useState('');
  const [budget, setBudget] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleProjectTypeChange = (event) => {
    setProjectType(event.target.value);
    // Reset other fields when project type changes
    setProgrammingLanguage('');
    setFrameworks([]);
    setDesignType('');
    setDesignTools([]);
    setConsultingArea('');
    setPreviousExperience('');
    setAdditionalComments('');
    setDeadline('');
    setBudget('');
    setContactInfo('');
    setErrors({});
    setSuccessMessage('');
  };

  const handleFrameworkChange = (event) => {
    const value = event.target.value;
    setFrameworks((prevFrameworks) =>
      prevFrameworks.includes(value)
        ? prevFrameworks.filter((framework) => framework !== value)
        : [...prevFrameworks, value]
    );
  };

  const handleDesignToolChange = (event) => {
    const value = event.target.value;
    setDesignTools((prevTools) =>
      prevTools.includes(value)
        ? prevTools.filter((tool) => tool !== value)
        : [...prevTools, value]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setSuccessMessage('Projeto registrado com sucesso!');
      // Aqui você pode processar os dados do projeto
      console.log({
        projectType,
        programmingLanguage,
        frameworks,
        designType,
        designTools,
        consultingArea,
        previousExperience,
        additionalComments,
        deadline,
        budget,
        contactInfo,
      });
      resetForm();
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!projectType) validationErrors.projectType = 'Tipo de Projeto é obrigatório.';
    if (projectType === 'Desenvolvimento de Software') {
      if (!programmingLanguage) validationErrors.programmingLanguage = 'Linguagem de Programação é obrigatória.';
      if (frameworks.length === 0) validationErrors.frameworks = 'Pelo menos um framework deve ser selecionado.';
    } else if (projectType === 'Design Gráfico') {
      if (!designType) validationErrors.designType = 'Tipo de Design é obrigatório.';
      if (designTools.length === 0) validationErrors.designTools = 'Pelo menos uma ferramenta deve ser selecionada.';
    } else if (projectType === 'Consultoria') {
      if (!consultingArea) validationErrors.consultingArea = 'Área de Consultoria é obrigatória.';
      if (!previousExperience) validationErrors.previousExperience = 'Experiência Anterior é obrigatória.';
      if (additionalComments.trim() === '') validationErrors.additionalComments = 'Comentários Adicionais são obrigatórios.';
    }
    if (!deadline || new Date(deadline) <= new Date()) validationErrors.deadline = 'Prazo deve ser uma data futura.';
    if (budget <= 0) validationErrors.budget = 'Orçamento deve ser um número positivo.';
    if (!contactInfo) validationErrors.contactInfo = 'Informações de Contato são obrigatórias.';
    return validationErrors;
  };

  const resetForm = () => {
    setProjectType('');
    setProgrammingLanguage('');
    setFrameworks([]);
    setDesignType('');
    setDesignTools([]);
    setConsultingArea('');
    setPreviousExperience('');
    setAdditionalComments('');
    setDeadline('');
    setBudget('');
    setContactInfo('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="project-registration-form">
      <h2>Registro de Projetos</h2>

      <div>
        <label>
          Tipo de Projeto:
          <select value={projectType} onChange={handleProjectTypeChange} required>
            <option value="">Selecione...</option>
            <option value="Desenvolvimento de Software">Desenvolvimento de Software</option>
            <option value="Design Gráfico">Design Gráfico</option>
            <option value="Consultoria">Consultoria</option>
          </select>
          {errors.projectType && <span className="error">{errors.projectType}</span>}
        </label>
      </div>

      {projectType === 'Desenvolvimento de Software' && (
        <>
          <div>
            <label>
              Linguagem de Programação:
              <select value={programmingLanguage} onChange={(e) => setProgrammingLanguage(e.target.value)} required>
                <option value="">Selecione...</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
              </select>
              {errors.programmingLanguage && <span className="error">{errors.programmingLanguage}</span>}
            </label>
          </div>

          <div>
            <label>Frameworks:</label>
            <div>
              {['React', 'Angular', 'Django'].map((framework) => (
                <label key={framework}>
                  <input
                    type="checkbox"
                    value={framework}
                    checked={frameworks.includes(framework)}
                    onChange={handleFrameworkChange}
                  />
                  {framework}
                </label>
              ))}
              {errors.frameworks && <span className="error">{errors.frameworks}</span>}
            </div>
          </div>
        </>
      )}

      {projectType === 'Design Gráfico' && (
        <>
          <div>
            <label>
              Tipo de Design:
              <select value={designType} onChange={(e) => setDesignType(e.target.value)} required>
                <option value="">Selecione...</option>
                <option value="Logo">Logo</option>
                <option value="Material Publicitário">Material Publicitário</option>
                <option value="Web Design">Web Design</option>
              </select>
              {errors.designType && <span className="error">{errors.designType}</span>}
            </label>
          </div>

          <div>
            <label>Ferramentas Utilizadas:</label>
            <div>
              {['Photoshop', 'Illustrator', 'Figma'].map((tool) => (
                <label key={tool}>
                  <input
                    type="checkbox"
                    value={tool}
                    checked={designTools.includes(tool)}
                    onChange={handleDesignToolChange}
                  />
                  {tool}
                </label>
              ))}
              {errors.designTools && <span className="error">{errors.designTools}</span>}
            </div>
          </div>
        </>
      )}

      {projectType === 'Consultoria' && (
        <>
          <div>
            <label>
              Área de Consultoria:
              <select value={consultingArea} onChange={(e) => setConsultingArea(e.target.value)} required>
                <option value="">Selecione...</option>
                <option value="TI">TI</option>
                <option value="Marketing">Marketing</option>
                <option value="Gestão de Projetos">Gestão de Projetos</option>
              </select>
              {errors.consultingArea && <span className="error">{errors.consultingArea}</span>}
            </label>
          </div>

          <div>
            <label>
              Experiência Anterior:
              <textarea
                value={previousExperience}
                onChange={(e) => setPreviousExperience(e.target.value)}
                required
              />
              {errors.previousExperience && <span className="error">{errors.previousExperience}</span>}
            </label>
          </div>

          <div>
            <label>
              Comentários Adicionais:
              <textarea
                value={additionalComments}
                onChange={(e) => setAdditionalComments(e.target.value)}
              />
              {errors.additionalComments && <span className="error">{errors.additionalComments}</span>}
            </label>
          </div>
        </>
      )}

      <div>
        <label>
          Prazo do Projeto:
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          {errors.deadline && <span className="error">{errors.deadline}</span>}
        </label>
      </div>

      <div>
        <label>
          Orçamento:
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            min="0"
            required
          />
          {errors.budget && <span className="error">{errors.budget}</span>}
        </label>
      </div>

      <div>
        <label>
          Contato:
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
          {errors.contactInfo && <span className="error">{errors.contactInfo}</span>}
        </label>
      </div>

      <button type="submit">Registrar Projeto</button>
      {successMessage && <p className="success">{successMessage}</p>}
    </form>
  );
}

export default ProjectRegistrationForm;
