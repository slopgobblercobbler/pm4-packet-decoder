#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItLoadContextRegDef {
    static constexpr std::uint8_t opcode = 0x60;
    static constexpr std::string_view name = "IT_LOAD_CONTEXT_REG";
    static constexpr std::string_view desc = "Load context registers directly from memory descriptor";
};
}
