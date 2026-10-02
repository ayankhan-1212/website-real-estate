import { Agent } from '../models/Agent.js';
import { Property } from '../models/Property.js';

export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().sort({ rating: -1 });
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    const properties = await Property.find({
      $or: [{ agent: agent._id }, { 'agentDetails.email': agent.email }],
    });

    res.json({
      agent,
      properties,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAgent = async (req, res) => {
  try {
    const agent = new Agent(req.body);
    const savedAgent = await agent.save();
    res.status(201).json(savedAgent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
