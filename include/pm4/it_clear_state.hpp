#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItClearStateDef {
    static constexpr std::uint8_t opcode = 0x12;
    static constexpr std::string_view name = "IT_CLEAR_STATE";
    static constexpr std::string_view desc = "Reset hardware context state registers back to default values";
};
}
